import React, { useEffect } from 'react'
import { getRecommendedProducts } from '../../redux/slices/product/recommendedProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const RecommendedProducts = ({fetchedProduct}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { recommended } = useSelector(store => store.recommendedProduct)
    useEffect(() =>{
        dispatch(getRecommendedProducts())
    }, []);
  return (
    <div className='recommended-products' data-testid='recommended-products'>
        <p style={{color:'black'}}> You may also like</p>
        <div className='recommended-container'>
      {recommended ? (
        fetchedProduct?.map((p) => {
          if (recommended.includes(p?.id)) {
            return (
              <div className='recommended-container' key={p?.id} onClick={()=>{navigate(`/products/${p?.id}`)}}>
                <div className='recommended-card'>
                <img src={p.images[0]}/>
                <div className=''>
                <h1>{p?.productName}</h1>
                <h1>{p?.price} RWF</h1>
                </div>
                </div>
        </div>
            );
          }
        }))
        :''}
      </div>
  </div>
  )
}

export default RecommendedProducts