import { MwButton, MwLoader } from '@mw-kit/mw-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal, { ModalState } from '../../../../../../components/MwModal';
import { getEPIDecrease } from '../../../../../../redux/actions/EPIWarehouseActions';
import { Provider } from './context';
import { DecreaseItem, HistoryProps, ReduxState } from './interfaces';
import * as S from './styles';

const LIMIT = 10;

const History = ({ close, data }: HistoryProps) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState<ModalState | null>(null);

  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<DecreaseItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { decreases, loading } = useSelector((state: ReduxState) => {
    const response = state.epiWarehouse.decreases;
    return {
      decreases: Array.isArray(response) ? response : response?.data || [],
      loading: state.epiWarehouse.loading,
    };
  });

  const fetchData = useCallback(() => {
    if (!data?.id || loading || !hasMore) return;

    dispatch(
      getEPIDecrease({
        epi_id: data.id,
        limit: LIMIT,
        offset,
        contain: ['Epi', 'Created'],
      })
    );
  }, [dispatch, data, offset, loading, hasMore]);

  // 🔹 Atualiza a lista sem duplicar registros
  useEffect(() => {
    if (!decreases || decreases.length === 0) {
      if (offset > 0) setHasMore(false);
      return;
    }

    setItems((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const newItems = decreases.filter((item) => !existingIds.has(item.id));
      return [...prev, ...newItems];
    });

    if (decreases.length < LIMIT) {
      setHasMore(false);
    }
  }, [decreases, offset]);

  // 🔹 Reinicia a lista ao trocar o item
  useEffect(() => {
    setItems([]);
    setOffset(0);
    setHasMore(true);
  }, [data]);

  // 🔹 Busca inicial e nas próximas páginas
  useEffect(() => {
    fetchData();
  }, [offset, fetchData]);

  // 🔹 IntersectionObserver controlado
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading
        ) {
          setOffset((prev) => prev + LIMIT);
        }
      },
      { threshold: 1 }
    );

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasMore, loading]);

  return (
    <Modal.Modal
      style={{ width: '837px', height: '567px', minHeight: '567px', display: 'flex' }}
      open
      size="small"
    >
      <Modal.Header color="blue">Histórico de Baixa</Modal.Header>

      <Modal.Body
        $paddingBottom="0"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
          paddingTop: '1.4rem',
          justifyContent: 'space-between',
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <S.TitleContainer style={{ padding: 0, paddingLeft: '8px' }}>
          <Modal.Subtitle>Visualize aqui o histórico de baixa.</Modal.Subtitle>
        </S.TitleContainer>

        <S.TabsContainer>
          <Provider value={{ data }}>
            {items.map((item) => (
              <S.GridContainer key={item.id}>
                <S.RowContainer>
                  <S.FlexContainer>
                    <S.RowContainer>
                      <S.LabelRow>
                        EPI:{' '}
                        <S.Label>
                          {item.epi?.epi_type?.name} {item.epi?.size}
                        </S.Label>
                      </S.LabelRow>
                      <S.InfoRow>
                        Data/Hora:{' '}
                        <S.InfoLabel>
                          {new Date(item.created_at).toLocaleString('pt-BR').replace(',', ' -')}
                        </S.InfoLabel>
                      </S.InfoRow>
                      <S.InfoRow style={{ marginBottom: '.6rem' }}>
                        Realizado por:{' '}
                        <S.InfoLabel>{item.created?.name || '-'}</S.InfoLabel>
                      </S.InfoRow>
                    </S.RowContainer>

                    <S.ColumnContainer>
                      <S.CenteredColumn>
                        <S.CenteredText>Qtde. Baixada:</S.CenteredText>
                        <S.BoldCenteredText>{item.inventory_decrease}</S.BoldCenteredText>
                      </S.CenteredColumn>
                    </S.ColumnContainer>
                  </S.FlexContainer>

                  <S.Section>
                    <S.SectionTitle>Motivo:</S.SectionTitle>
                    <span>{item.reason}</span>
                  </S.Section>
                  <S.Section>
                    <S.SectionTitle>Observação:</S.SectionTitle>
                    <span>{item.obs}</span>
                  </S.Section>
                </S.RowContainer>
              </S.GridContainer>
            ))}

            {loading && <MwLoader filled />}
            <div ref={loaderRef} style={{ height: '20px' }} />

            <Modal modal={modal} />
          </Provider>
        </S.TabsContainer>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          content="OK"
          style={{ width: '6rem', color: 'white', backgroundColor: '#3455AB ' }}
          type="button"
          appearance="borderless"
          size="large"
          onClick={close}
        />
      </Modal.Footer>
    </Modal.Modal>
  );
};

export default History;
