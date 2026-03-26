import { Country, ISOs } from './interfaces'

const countries: { [key in ISOs]: Country } = {
  ar: {
    name: 'Argentina',
    iso: 'ar',
    ddi: 54,
    placeholder: '011 15-2345-678',
    validation: /^[0-9]{12}$/i,
    charLimit: 12,
    mask: (value: string) => {
      return value.replace(/(\d{3})(\d{2})(\d{4})(\d{3})$/, '$1 $2-$3-$4')
    },
  },
  br: {
    name: 'Brasil',
    iso: 'br',
    ddi: 55,
    placeholder: '(00) 00000-0000',
    validation: /^[0-9]{2}(?:[2-8]|9[0-9])[0-9]{7}$/i,
    charLimit: 11,
    mask: (value: string) => {
      return value
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2')
        .replace(/(\d{4})(\d{4})/, '$1-$2')
    },
  },
  cl: {
    name: 'Chile',
    iso: 'cl',
    ddi: 56,
    placeholder: '(2) 2123 4567',
    validation: /^[0-9]{9}$/i,
    charLimit: 9,
    mask: (value: string) => {
      return value.replace(/(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3')
    },
  },
  es: {
    name: 'Espanha',
    iso: 'es',
    ddi: 34,
    placeholder: '612 34 56 78',
    validation: /^[0-9]{9}$/i,
    charLimit: 9,
    mask: (value: string) => {
      return value.replace(/(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4')
    },
  },
  us: {
    name: 'Estados Unidos',
    iso: 'us',
    ddi: 1,
    placeholder: '(201) 555-01',
    validation: /^[0-9]{8}$/i,
    charLimit: 8,
    mask: (value: string) => {
      return value.replace(/(\d{3})(\d{3})(\d{2})$/, '($1) $2-$3')
    },
  },
  mx: {
    name: 'México',
    iso: 'mx',
    ddi: 52,
    placeholder: '044 222 123 45',
    validation: /^[0-9]{11}$/i,
    charLimit: 11,
    mask: (value: string) => {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1 $2 $3 $4')
    },
  },
  py: {
    name: 'Paraguai',
    iso: 'py',
    ddi: 595,
    validation: /^[0-9]{9}$/i,
    charLimit: 9,
    mask: (value: string) => {
      return value.replace(/(\d{3})(\d{6})$/, '$1 $2')
    },
  },
  pt: {
    name: 'Portugal',
    iso: 'pt',
    ddi: 351,
    placeholder: '912 345 678',
    validation: /^[0-9]{9}$/i,
    charLimit: 9,
    mask: (value: string) => {
      return value.replace(/(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3')
    },
  },
  uy: {
    name: 'Uruguai',
    iso: 'uy',
    ddi: 598,
    placeholder: '094 231 234',
    validation: /^[0-9]{9}$/i,
    charLimit: 9,
    mask: (value: string) => {
      return value.replace(/(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3')
    },
  },
}

export default countries
