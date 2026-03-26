import { FiltersInterfaces } from '@mw-kit/mw-manager'

export interface AccordionBodyInterface {
  file_count: number | null
  pagination: number
  isLastPage: boolean
  category: {
    id: number | null
    name: string | null
  }
  itemId: number | null
}

export interface AccordionImagesBodyInterface {
  id: number | null
  name: string | null
  url: string | null
  extension: string | null
  hash: string | null
  store: StoreProps
  tags: TagsProps[]
}

interface StoreProps {
  id: string | number | null
  name: string | null
  formatted_address: string | null
  street_type: string | null
  street_address: string | null
  street_number: number | string | null
  complement: string | null
  sublocality: string | null
  city: string | null
  state: string | null
  postal_code: string | null
}

interface TagsProps {
  id: number | null
  file_id: number | null
  name: string | null
  value: number | null
}

export interface DataInterface {
  accordionId: number | null
  pagination: number
  total_registries: number
  isLastPage: boolean
  images: {
    id: number | null
    name: string | null
    url: string | null
    extension: string | null
    hash: string | null
    store: StoreProps
    tags: TagsProps[]
  }[]
}

export interface ParamsProps {
  name: string
  initialDate: string
  finalDate: string
  ids: string
  appliedFilters: FiltersInterfaces.AppliedFilter[]
}

export interface DirectionProps {
  direction: 'row' | 'column'
  isHidden?: boolean
}

export interface DetailsProps {
  created_at: string
  form: DetailsForm
  status: StatusData
  people: PeopleData
  attendance: AttendencesData
  store: StoreData
  products: ProductsData[]
  tags: Tags[]
  category: CategoryProps
}

interface DetailsForm {
  id?: number
  name: string
}

interface ReasonData {
  id: number
  description: string
}

export interface StatusData {
  value: number
  modified_at: string
  modified_by: {
    id: number
    name: string
  }
  reason: ReasonData
  notes: string
}

interface PeopleData {
  id?: number
  name: string
  role?: {
    id?: string
    name?: string
  }
}

interface Tags {
  name: string
  value: number
}

interface AttendencesData {
  id: number
  lat: number | null
  lng: number | null
  distance: number | null
  radius: number | null
}

interface ProductsData {
  id: number
  code: number
  name: string
  description: string
}

interface StoreData {
  id: number
  name: string
  formatted_address: string
  street_type: string
  street_address: string
  street_number: number
  complement: string
  sublocality: string
  city: string
  state: string
  postal_code: number
  lat: number
  lng: number
  radius: number
}

interface CategoryProps {
  id: number | null
  name: string | null
}
