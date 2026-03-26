import { yupResolver } from '@hookform/resolvers/yup';
import { MwButton, MwGrid, MwLoader } from '@mw-kit/mw-ui';
import { useEffect, useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Modal, { ModalState } from '../../../../../../../components/MwModal';
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent
} from '../../../../../../../components/Toaster';
import {
  addEPIFiscalNote, fetchEPIQuantity, fetchEPITypes,
  fetchFiscalNoteById, updateFiscalNote
} from '../../../../../../../redux/actions/EPIWarehouseActions';
import SizesTable from '../../SizeTypes';
import { Provider } from './context';
import * as Inputs from './inputs';
import { CreateProps, FormSubmit } from './interfaces';
import { create as formSchema, getDefaultData } from './schemas';
import * as S from './styles';

interface SizeRow {
  id: number;
  size: string;
  quantity: number;
  addQuantity: number;
}

const Create = ({close, data, reload}: CreateProps) => {
  const isEditing = Boolean(data);
  const resolver: Resolver<FormSubmit> | undefined = isEditing
    ? undefined
    : (yupResolver(formSchema as any) as Resolver<FormSubmit>);

  const form = useForm<FormSubmit>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: getDefaultData(data),
    shouldFocusError: false,
    shouldUnregister: false,
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [options, setOptions] = useState<
    { value: string | number; label: string; size_type?: string }[]
  >([]);
  const [epiList, setEpiList] = useState<any[]>([]);
  const [epiSizes, setEpiSizes] = useState<SizeRow[]>([]);

  const dispatch = useDispatch();

  const epiOptions = options.map((o) => ({
    value: String(o.value),
    label: o.label,
    size_type: o.size_type,
  }));

  // Carrega a lista de EPIs

  useEffect(() => {
    const loadEPITypes = async () => {
      try {
        const response: any = await dispatch(
          fetchEPITypes({contain: 'Epis', limit: 99999}) as any
        );

        const epiArray =
          response?.data?.data ?? response?.data ?? response?.payload ?? null;


        if (Array.isArray(epiArray)) {
          setEpiList(epiArray);
          setOptions(
            epiArray.map((epi) => ({
              value: epi.id,
              label: epi.name,
              size_type: epi.size_type,
            }))
          );
        } else {
          toast.error('Nenhuma opção de EPI encontrada.');
        }
      } catch (error) {
        toast.error('Erro ao carregar os EPIs.');
        console.error(error);
      }
    };

    loadEPITypes();
  }, [dispatch]);

  const isoToDDMMYYYY = (iso?: string | null) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('T')[0].split('-');
    return `${d}/${m}/${y}`;
  };

  // carrega dados da nota fiscal
  useEffect(() => {
    const loadFiscalNote = async () => {
      if (!isEditing || !data?.id) return;
      if (options.length === 0) return;

      try {
        const fiscalNote = await dispatch(fetchFiscalNoteById(data.id) as any);
        const fiscalNoteQuantitys = await dispatch(fetchEPIQuantity({link_id: data.id}) as any);
        let fiscalNoteQuantitysGruped: Record<string, number> = {};
        if (Array.isArray(fiscalNoteQuantitys)) {
          fiscalNoteQuantitys.forEach((item) => {
            fiscalNoteQuantitysGruped[item.size] = item.qtd;
          });
        }

        form.reset({
          epi_type_id: String(fiscalNote.epi_type_id),
          number: fiscalNote.number,
          date: isoToDDMMYYYY(fiscalNote.date),
          supplier: fiscalNote.supplier,
            ca_code: fiscalNote.ca_code,
          ca_code_expiration: isoToDDMMYYYY(fiscalNote.ca_code_expiration),
          obs: fiscalNote.obs,
          // usa quantidade real em vez de 0
          epis_invetory_add: fiscalNote.epi_type.epis.map((epi) => ({
            epi_id: epi.id,
            quantity: fiscalNoteQuantitysGruped[epi.size] || 0,
          })),
        });

        setEpiSizes(
          fiscalNote.epi_type.epis.map((epi) => ({
            id: epi.id,
            size: epi.size,
            quantity: fiscalNoteQuantitysGruped[epi.size] || 0,
            addQuantity: 0,
          }))
        );
      } catch (error) {
        console.error("Erro ao carregar nota fiscal:", error);
      }
    };

    loadFiscalNote();
  }, [isEditing, data?.id, options]);

  const onSubmit = async (formData: FormSubmit) => {
    setLoading(true);
    try {
      const safeSplit = (value?: string) => {
        const [d = '', m = '', y = ''] = (value ?? '').split('/');
        return [d, m, y];
      };

      let [d, m, y] = safeSplit(formData.date);
      const date = y && m && d ? `${y}-${m}-${d}` : null;

      [d, m, y] = safeSplit(formData.ca_code_expiration);
      const expiration = y && m && d ? `${y}-${m}-${d}` : null;

      if (isEditing) {
        const payload = {
          id: formData.id,
          ca_code: formData.ca_code,
          ca_code_expiration: expiration,
          obs: formData.obs,
          epis_invetory_add: epiSizes
            .filter((item) => Number(item.addQuantity) > 0)
            .map((item) => ({
            epi_id: item.id,
            qtd: Number(item.addQuantity || 0),
          })),
        };
        console.log('payload a ser enviado editando:', payload);
        await dispatch(updateFiscalNote(data.id, payload) as any);

      } else {
        const payload = {
          epi_type_id: Number(formData.epi_type_id),
          number: formData.number,
          date,
          supplier: formData.supplier,
          ca_code: formData.ca_code,
          ca_code_expiration: expiration,
          obs: formData.obs,
          epis_invetory_add: epiSizes.map((item) => ({
            epi_id: item.id,
            qtd: Number(item.quantity),
            addQtd: Number(item.addQuantity || 0),
          })),
        };
        console.log('payload a ser enviado cadastrando:', payload);
        await dispatch(addEPIFiscalNote(payload) as any);
      }

      toast(<ToasterContent color="normal"/>, SuccessStyle);
      reload();
      close();
    } catch (error) {
      toast(<ToasterContent color="error"/>, ErrorStyle);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

    const selectedEPI = epiList.find(
      (epi) => String(epi.id) === form.watch('epi_type_id')
    );

    if (!selectedEPI) {
      setEpiSizes([]);
      return;
    }

    // Caso de criação: popula tamanhos com quantidade padrão 1 (editável posteriormente)
    if (!isEditing && selectedEPI.epis?.length > 0) {
      setEpiSizes(
        selectedEPI.epis.map((epi) => ({
          id: epi.id,
          size: epi.size,
          quantity: 1, // valor padrão
          addQuantity: 0,
        }))
      );
      // atualiza campo do formulário para refletir quantidade padrão
      form.setValue('epis_invetory_add', selectedEPI.epis.map((epi: any) => ({
        epi_id: epi.id,
        qtd: 1,
      })) as any);
    }
  }, [form.watch('epi_type_id'), epiList, isEditing]);

  // Na edição, não bloqueamos o salvar por campos obrigatórios
  const requiredFields: (keyof FormSubmit)[] = [
    'epi_type_id', 'ca_code', 'ca_code_expiration', 'obs', 'number', 'date', 'supplier'
  ];

  const allRequiredFilled = requiredFields.every((field) => {
    const value = form.watch(field);
    return value !== undefined && value !== null && value !== '';
  });

  return (
    <Modal.Modal
      style={{width: '60vw', height: '70vh', maxWidth: '1600px', maxHeight: '900px'}}
      open
      size="small"
    >
      <Modal.Header color="blue">
        {data ? 'Editar' : 'Cadastrar'} Nota
      </Modal.Header>

      <Modal.Body
        $paddingBottom="0"
        style={{
          maxHeight: '60vh',
          paddingLeft: 0,
          paddingRight: '1rem',
          paddingTop: '3rem',
        }}
      >
        <S.TitleContainer>
          <Modal.Subtitle
            style={{
              paddingTop: '1rem',
              height: '60px',
              position: 'fixed',
              top: '5rem',
              alignItems: 'center',
            }}
          >
            Utilize os campos abaixo para realizar o cadastro das notas
          </Modal.Subtitle>
        </S.TitleContainer>

        <S.TabsContainer>
          <Provider value={{data, form}}>
            <form id="create" onSubmit={form.handleSubmit(onSubmit)}>
              <MwGrid borderless spacing="0" rows={{borderless: true}}>
                <MwGrid.Col style={{alignItems: 'flex-start', gap: '2rem', paddingTop: '1rem'}}>

                  {/* Linha 1 */}
                  <MwGrid.Row style={{width: '100%', paddingLeft: '20px', gap: '2rem'}}>
                    <MwGrid.Row style={{width: '766px'}}>
                      <Controller
                        name="epi_type_id"
                        control={form.control}
                        render={({field}) => (
                          <Inputs.Select
                            {...field}
                            style={{width: '556px'}}
                            required
                            label="Selecione EPI"
                            placeholder={options.length === 0 ? 'Carregando...' : 'Selecione um EPI'}
                            options={epiOptions}
                            disabled={isEditing}
                          />
                        )}
                      />
                    </MwGrid.Row>

                    <MwGrid.Row style={{gap: 4}}>
                      <MwGrid.Col width="3">
                        <Inputs.Text
                          name="ca_code"
                          label="Código CA"
                          control={form.control}
                          required={!isEditing}
                        />
                      </MwGrid.Col>

                      <MwGrid.Col width="2">
                        <Inputs.Date
                          name="ca_code_expiration"
                          label="Validade do Código CA"
                          control={form.control}
                          required={!isEditing}
                        />
                      </MwGrid.Col>
                    </MwGrid.Row>

                    <MwGrid.Row style={{width: '684px'}}>
                      <Controller
                        name="obs"
                        control={form.control}
                        render={({field}) => (
                          <Inputs.TextField
                            {...field}
                            label="Descrição"
                            placeholder="Digite aqui"
                            multiline
                            maxLength={150}
                            style={{
                              width: '100%',
                              height: '120px',
                              alignContent: 'flex-start',
                              alignItems: 'flex-start',
                              marginTop: '.6rem',
                            }}
                          />
                        )}
                      />
                    </MwGrid.Row>
                  </MwGrid.Row>

                  <div style={{width: '100%', borderBottom: '1px solid #E4E4E4', marginTop: '1.5rem'}}/>

                  {/* Linha 2 - Dados da compra */}
                  <MwGrid.Row style={{width: '100%', paddingLeft: '20px', gap: '2rem'}}>
                    <S.SectionTitle>Dados da Compra</S.SectionTitle>

                    <MwGrid.Row style={{gap: 4}}>
                      <MwGrid.Col width="2">
                        <Inputs.Text
                          name="number"
                          label="Número da Nota Fiscal"
                          control={form.control}
                          required
                          disabled={isEditing}
                        />
                      </MwGrid.Col>

                      <MwGrid.Col width="2">
                        <Inputs.Date
                          name="date"
                          label="Data da Compra"
                          control={form.control}
                          required
                          disabled={isEditing}
                        />
                      </MwGrid.Col>

                      <MwGrid.Col width="2">
                        <Inputs.Text
                          style={{width: '400px'}}
                          name="supplier"
                          label="Fornecedor"
                          control={form.control}
                          required
                          disabled={isEditing}
                        />
                      </MwGrid.Col>
                    </MwGrid.Row>

                    {/* Tabela de tamanhos */}
                    <MwGrid.Row style={{gap: 4, width: '600px'}}>
                      {epiSizes.length > 0 && (
                        <Controller
                          name="epis_invetory_add"
                          control={form.control}
                          render={({field}) => (
                            <SizesTable
                              data={epiSizes}
                              onChange={(updatedSizes) => {
                                setEpiSizes(updatedSizes);

                                const payloadForForm = updatedSizes.map((item) => ({
                                  epi_id: item.id,
                                  qtd: Number(item.quantity),
                                }));

                                field.onChange(payloadForForm);
                              }}
                              isEditing={isEditing}
                            />
                          )}
                        />
                      )}

                    </MwGrid.Row>
                  </MwGrid.Row>
                </MwGrid.Col>

                {loading && <MwLoader filled/>}
              </MwGrid>

              <Modal modal={modal}/>
            </form>
          </Provider>
        </S.TabsContainer>
      </Modal.Body>

      <Modal.Footer>
        <MwButton content="Cancelar" appearance="borderless" size="large" onClick={close}/>
        <MwButton
          style={{minWidth: '12rem'}}
          type="submit"
          form="create"
          content="Salvar"
          size="large"
          disabled={(isEditing ? false : !allRequiredFilled) || loading}
        />
      </Modal.Footer>
    </Modal.Modal>
  );
};

export default Create;
