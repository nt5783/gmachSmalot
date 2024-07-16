import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, UserContext, DateContext, FavoritesContext } from '../App';
import { fetchNoParamsfunc } from '../fetch';
import AddGown from './AddGown';
import UpdateGownsAmount from './UpdateGownsAmount';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Message } from 'primereact/message';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-calendar/dist/Calendar.css';

function Gowns() {
  const navigate = useNavigate();
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { user } = useContext(UserContext);
  const { date } = useContext(DateContext);
  const { setCart } = useContext(CartContext);
  const [modelInfo, setModelInfo] = useState({});
  const [gowns, setGowns] = useState([]);
  const [selectedGown, setSelectedGown] = useState(null);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState('');
  const [amountToOrder, setAmountToOrder] = useState(1);
  const eventDate = date ? new Date(date) : null;
  const model = window.location.href.split('/')[4];

  useEffect(() => {
    getGowns();
    getModelInfo();
  }, []);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setMessage('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  async function getModelInfo() {
    try {
      const res = fetchNoParamsfunc(`models/${model}`, 'GET')
      const data = await res;
      if (data && data.length > 0) setModelInfo(data[0]);
    }
    catch (err) {
      alert(`Error getting model info: ${err.message}`)
    }
  }

  async function getGowns() {
    try {
      const res = eventDate
        ? fetchNoParamsfunc(`gowns?model=${model}&date=${eventDate}`, 'GET')
        : fetchNoParamsfunc(`gowns?model=${model}`, 'GET');
      const data = await res;
      if (data && data.length > 0) setGowns(data);
    } catch (err) {
      if (err.status != 404)
        alert(`Error getting gowns: ${err.message}`)
    }
  }

  function gownSelected(i) {
    setAmountToOrder(1)
    setSelectedGown((prev) => (prev === i ? i : i));
  }

  function AddGownToCart(gown) {
    const gownId = gown.gownId;
    if (!user) navigate('/login', { state: { model: model, message: 'you must log in to your account' } });
    else
      setCart((prevCart) => {
        const gownIndex = prevCart.items.findIndex((item) => item.gownId === gownId);
        if (gownIndex == -1)
          return {
            qty: prevCart.qty + Number(amountToOrder),
            items: [...prevCart.items, { gownId, model: gown.model, size: gown.size, img: modelInfo.image, qty: Number(amountToOrder) }],
          };
        const updatedItems = prevCart.items.map((item, index) => {
          if (index === gownIndex) return { ...item, qty: item.qty + Number(amountToOrder) };
          return item;
        });
        return { qty: prevCart.qty + Number(amountToOrder), items: updatedItems };
      });
    if (amountToOrder > 1) setMessage(`${amountToOrder} Gowns Model: ${model}, Size: ${gown.size} were added to cart successfully`);
    else setMessage(`Gown Model: ${model}, Size: ${gown.size} was added to cart successfully`);
    setSelectedGown(null);
  }

  function handleOrder() {
    if (!user) navigate('/login', { state: { model: model, message: 'you must log in to your account' } });
    else if (amountToOrder > 0) {
      let gownToOrder = gowns[selectedGown]
      gownToOrder.qty = amountToOrder - 1 + 1
      navigate('/order', { state: { gowns: [gownToOrder] } })
    }
  }

  async function deleteGown() {
    if (confirm(`Are you sure you want to delete size ${gowns[selectedGown].size} from model ${model} from the database?\nnote: it is possible that there are future orders for gowns of this size, the deletion is only for now on`)) {
      try {
        await fetchNoParamsfunc(`gowns/${gowns[selectedGown].gownId}`, 'DELETE');
        alert(`Gowns from size ${gowns[selectedGown].size} deleted successfully\n from now on, this size will not be ordered`)
        await getGowns();
        setSelectedGown(null)
      } catch (err) {
        alert(`Error deleting gown: ${err.message}`)
      }
    }
  }

  function gownHeader() {
    return (<>
      <h2>Model: {model}</h2>
      <h4>Color: {modelInfo.color}</h4>
      <h4>Length: {modelInfo.length}</h4>
      <h4>Season: {modelInfo.season}</h4>
    </>)
  }

  return (
    <>
      {visible && <Message className="success-message" severity="success" text={message} />}
      {showForm === 'add' && <AddGown gowns={gowns} model={model} formOn={setShowForm} getGowns={getGowns} />}
      <div className="gown-container">
        <img className="gown-image" src={modelInfo.image} alt={model} />
        <Panel header={gownHeader} className="gown-details">
          <div>
            <span>Size: </span>
            {/* sizes */}
            {gowns.length == 0 && <h3>No sizes available</h3>}
            <div className="size-buttons">
              {gowns.map((gown, i) => (
                <Button key={i} label={gown.size} disabled={gown.available < 1} onClick={() => gownSelected(i)} className="p-button-outlined p-button-secondary" />
              ))}
              {user && user.isManager === 1 && <Button label='Add Size' icon="pi pi-plus" onClick={() => setShowForm((prev) => (prev === 'add' ? '' : 'add'))}
                className="manager-button p-button-outlined p-button-secondary" />}
            </div>
          </div>
          {/*specific size gown */}
          {selectedGown !== null && (
            <div>
              <span><b>Size: {gowns[selectedGown].size}</b></span><br />
              <span>Available amount: {gowns[selectedGown].available}</span>
              {user && user.isManager === 1 && (
                <div>
                  <Button label="Update this size inventory" icon="pi pi-pen-to-square" onClick={() => setShowForm((prev) => (prev === 'update' ? '' : 'update'))} className='manager-button' />
                  <Button label="Remove this size" icon="pi pi-trash" onClick={deleteGown} className='manager-button' />
                </div>
              )}<br /><br />
              {!eventDate && <div><span className="warning">you are in display mode. you have to pick a date <a className="no-background" href="../eventCalendar">pick a date here</a></span></div>}<br />
              <label htmlFor="amount">amount:</label>
              <input disabled={eventDate == null} type="number" name="amount" min="1" max={gowns[selectedGown].available} value={amountToOrder} onChange={(e) => setAmountToOrder(e.target.value)} /><br />
              <Button label="Add to cart" icon="pi pi-shopping-cart" disabled={!eventDate} onClick={() => AddGownToCart(gowns[selectedGown])} />
              <Button label="Order now" icon="pi pi-shopping-bag" disabled={!eventDate} onClick={handleOrder} />
              {showForm === 'update' && <UpdateGownsAmount gown={gowns[selectedGown]} getGowns={getGowns} index={selectedGown} formOn={setShowForm} />}
            </div>
          )}
        </Panel>
        <div className='gown-favorite'>
          {user && !favorites.some((m) => m.model == model) && <i className='pi pi-star' onClick={() => { setFavorites((prev) => [...prev, modelInfo]) }} />}
          {user && favorites.some((m) => m.model == model) && <i className='pi pi-star-fill' onClick={() => { setFavorites((prev) => prev.filter(m => m.model != model)) }} />}
        </div>
      </div>
    </>
  );
}

export default Gowns;


