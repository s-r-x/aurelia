import { h } from "hyperapp"
const Form = () => (
  <form class="cart--form" action="/">
    <div className="cart--form-sect">
      <label for="">Адрес доставки</label>
      <input type="text" placeholder="Адрес доставки" />
    </div>
    <div className="cart--form-sect">
      <label for="">Ваш телефон</label>
      <input type="tel" placeholder="Ваш телефон" />
    </div>
    <div className="cart--form-sect">
      <label for="">Телефон получателя</label>
      <input type="tel" placeholder="Телефон получателя" />
    </div>
    <div className="cart--form-sect">
      <label for="">Пожелание для получателя</label>
      <textarea id="" name="" cols="30" rows="3" placeholder="Пожелание для получателя">
      </textarea>
    </div>
    <div className="cart--form-sect">
      <label for="">Способ оплаты</label>
      <select id="" name="" class="cart--payment">
        <option value="Visa/Mastercard">Visa/Mastercard</option>
        <option value="Visa/Mastercard">Мир</option>
        <option value="Visa/Mastercard">Paypal</option>
        <option value="Visa/Mastercard">Золотые галлеоны</option>
      </select>
    </div>
    <button className="button" type="submit">Перейти к оплате</button>
  </form>
);

export default Form;
