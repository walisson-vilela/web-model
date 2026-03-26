export interface HttpResponse {
  id: 615
  check_in_by_name: string
  check_in_ip: string
  check_in_notification: string
  check_in_type: number
  check_in_type_srt: string
  check_out_by_name: string
  check_out_ip: string
  check_out_notification: string
  check_out_type: number
  check_out_type_srt: string
  store_id: number
  store_name: string
  success: boolean
}

export interface ComponentProps {
  params: any
  checkType?: 'check-in' | 'check-out'
}
