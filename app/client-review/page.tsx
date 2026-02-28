import ClickReview from '@/components/clientreview'
import { Header } from '@/components/header'
import React from 'react'
import { ReviewHeader } from '@/components/reviewheader'
import { ReviewFooter } from '@/components/reviewfooter'

const  Review = () => {
  return (
   <>
   <ReviewHeader />
   <ClickReview />
   <ReviewFooter />
   </>
  )
}

export default Review