import { useState, useEffect } from 'react';
import func2url from '../../backend/func2url.json';
import Icon from '@/components/ui/icon';

const ADMIN_TOKEN = 'polimer-admin-2024';

const DELIVERY_LABELS: Record<string, string> = {
  courier: 'Курьер',
  sdek: 'СДЭК',
  pochta: 'Почта России',
  pickup: 'Самовывоз',
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: 'Новый', color: 'bg-blue-100 text-blue-700' },
  processing: { label: 'В работе', color: 'bg-yellow-100 text-yellow-700' },
  shipped: { label: 'Отправлен', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Доставлен', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-700' },
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  name: string;
  phone: string;
  email: string;
  delivery: string;
  address: string;
  comment: string;
  total: number;
  items: OrderItem[];
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleLogin = () => {
    if (password === ADMIN_TOKEN) {
      setAuthed(true);
      setPasswordError('');
    } else {
      setPasswordError('Неверный пароль');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch(func2url['save-order'], {
      headers: { 'X-Admin-Token': ADMIN_TOKEN },
    });
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchOrders();
  }, [authed]);

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    await fetch(func2url['save-order'], {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': ADMIN_TOKEN },
      body: JSON.stringify({ id, status }),
    });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    setUpdatingId(null);
  };

  const formatDate = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Админ-панель</h1>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {passwordError && <p className="text-red-500 text-sm mb-3">{passwordError}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground font-semibold rounded-lg py-2 hover:opacity-90 transition"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Заказы</h1>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 text-sm hover:bg-muted transition"
          >
            <Icon name="RefreshCw" size={16} />
            Обновить
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Загрузка...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">Заказов пока нет</div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div
                  className="flex flex-wrap items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/40 transition"
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                >
                  <span className="font-mono text-muted-foreground text-xs w-8">#{order.id}</span>
                  <span className="font-semibold flex-1 min-w-0 truncate">{order.name}</span>
                  <span className="text-sm text-muted-foreground hidden sm:block">{order.phone}</span>
                  <span className="text-sm hidden sm:block">{DELIVERY_LABELS[order.delivery] || order.delivery}</span>
                  <span className="font-bold text-primary">{order.total.toLocaleString('ru-RU')} ₽</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_LABELS[order.status]?.color || 'bg-gray-100 text-gray-600'}`}>
                    {STATUS_LABELS[order.status]?.label || order.status}
                  </span>
                  <span className="text-xs text-muted-foreground hidden md:block">{formatDate(order.created_at)}</span>
                  <Icon name={expanded === order.id ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-muted-foreground ml-auto" />
                </div>

                {expanded === order.id && (
                  <div className="border-t px-5 py-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div><span className="text-muted-foreground">Email:</span> {order.email}</div>
                      <div><span className="text-muted-foreground">Доставка:</span> {DELIVERY_LABELS[order.delivery] || order.delivery}</div>
                      {order.address && <div className="sm:col-span-2"><span className="text-muted-foreground">Адрес:</span> {order.address}</div>}
                      {order.comment && <div className="sm:col-span-2"><span className="text-muted-foreground">Комментарий:</span> {order.comment}</div>}
                      <div><span className="text-muted-foreground">Дата:</span> {formatDate(order.created_at)}</div>
                    </div>

                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-muted text-left">
                          <th className="px-3 py-2 font-medium">Товар</th>
                          <th className="px-3 py-2 font-medium text-right">Кол-во</th>
                          <th className="px-3 py-2 font-medium text-right">Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, i) => (
                          <tr key={i} className="border-t">
                            <td className="px-3 py-2">{item.name}</td>
                            <td className="px-3 py-2 text-right">{item.quantity} шт.</td>
                            <td className="px-3 py-2 text-right">{item.price.toLocaleString('ru-RU')} ₽</td>
                          </tr>
                        ))}
                        <tr className="border-t font-bold bg-muted/40">
                          <td className="px-3 py-2" colSpan={2}>Итого</td>
                          <td className="px-3 py-2 text-right text-primary">{order.total.toLocaleString('ru-RU')} ₽</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="flex flex-wrap gap-2">
                      {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => (
                        <button
                          key={key}
                          disabled={order.status === key || updatingId === order.id}
                          onClick={() => updateStatus(order.id, key)}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium border transition
                            ${order.status === key ? color + ' cursor-default border-transparent' : 'bg-white border-gray-200 hover:bg-muted'}
                            ${updatingId === order.id ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}