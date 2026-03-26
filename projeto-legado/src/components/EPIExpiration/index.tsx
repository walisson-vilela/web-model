import React from 'react';

interface EPIExpirationProps {
  epi_expiration_months?: string
}

const EPIExpiration: React.FC<EPIExpirationProps> = ({ epi_expiration_months }) => {

  return (

      <div style={{ fontWeight: 500, color: '#000000', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
         {epi_expiration_months} {epi_expiration_months !== "1" ? 'meses' : 'mês'}
      </div>
  )
}

export default EPIExpiration
