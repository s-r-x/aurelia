import { h } from 'hyperapp';

const Col = (_, Child) => {
  return (
    <div class="cart--table-col">
      {Child}
    </div>       
  )
};
export default Col;
