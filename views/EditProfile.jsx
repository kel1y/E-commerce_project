/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-loop-func */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable no-unused-expressions */
// /* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { Tab, Tabs, TabPanel, TabList} from 'react-tabs';
import { useDispatch, useSelector } from 'react-redux'
import AccountDetails from '../components/profile/AccountDetails'
import AddressDetails from '../components/profile/AddressDetails'
import { getUser } from '../redux/slices/profile/updateProfile';

const EditProfile = () => { 
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getUser())
  },[dispatch])
  const {data} = useSelector(state=> state.profile.profile)
  return (
    <Tabs className='Tabs' data-testid='tabs'>
      <TabList className='TabList'>
        <Tab>
          <span>Account</span>
        </Tab>
        <Tab>
          <span>Address</span>
        </Tab>
      </TabList>
      <TabPanel>
        <div className='profile-container-edit'>
         <AccountDetails data={data}/>
        </div>
      </TabPanel>
      <TabPanel>
      <div className='profile-container-edit'>
     <AddressDetails billingAddress={data.BillingAddress} />
     </div>
     </TabPanel>

    </Tabs>
  )
}

export default EditProfile
