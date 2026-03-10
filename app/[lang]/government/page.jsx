import React from 'react'
import Content from '@/components/Government/Content'

const GovernmentServicesPage = async ({ params }) => {
  const { lang } = await params;
  return (
    <>
    <Content lang={lang} />
    </>
  )
}

export default GovernmentServicesPage