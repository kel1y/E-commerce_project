import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from '../redux/slices/counter';

const useCounter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const actions = {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
    incrementByValue: (value) => dispatch(incrementByAmount(value)),
  };
  return [count, actions];
};
export default useCounter;
