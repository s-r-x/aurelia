import { h } from "hyperapp"
import Col from './Col.jsx';
import Row from './Row.jsx';

const Table = ({ items, actions }) => {
  return (
    <div class="cart--table">
      <Row>
        <Col>
          Товар 
        </Col>
        <Col>
          Цена
        </Col>
        <Col>
          Кол-во
        </Col>
        <Col>
          Всего
        </Col>
      </Row>
      { items.map(item => (
        <Row>
          <Col>
            {item.title}    
          </Col>
          <Col>
            <span className="accent">
              {item.price}
            </span> руб    
          </Col>
          <Col>
            {item.amount > 1 &&
                <button 
                  onclick={() => actions.items.decAmount(item.id)}
                  className="cart--amount-btn" 
                  aria-label={"уменьшить количество на единицу для товара " + item.title}>
                  - 
                </button>
            }
            <span>
              {item.amount}    
            </span>
            <button 
              onclick={() => actions.items.incAmount(item.id)}
              className="cart--amount-btn" 
              aria-label={"увеличить количество на единицу для товара " + item.title}>
              + 
            </button>
          </Col>
          <Col>
            <span className="accent">
              {item.amount * item.price} 
            </span> руб
          </Col>
          <button 
            onclick={() => {
              __ee__.emit('cart_remove');
              actions.items.remove(item.id)
            }}
            className="cart--remove-btn" 
            title={"удалить " + item.title}
            aria-label={"удалить товар " + item.title + " из корзины"}>
            <i className="icon-cancel"></i>
          </button>
        </Row>
      ))}
      <Row>
        <Col>
          Итого
        </Col>
        <Col>
          <span className="accent">
            { items.reduce((acc, item) => {
              return acc + item.price * item.amount;
            }, 0) }
          </span> руб
        </Col>
      </Row>
    </div>
  )
}

export default Table;
