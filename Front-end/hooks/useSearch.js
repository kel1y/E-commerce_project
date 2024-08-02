import { useState } from 'react'

const useSearch = () => {
  const [value, setInputs] = useState();

  const handleInputChange = (e) => {
   setInputs(e.target.value);
  }
  return{
    value,
    onChange: handleInputChange
  }
}
export default useSearch