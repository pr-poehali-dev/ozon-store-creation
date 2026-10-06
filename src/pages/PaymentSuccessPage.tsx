import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto text-center py-16 space-y-4 animate-fade-in">
      <Helmet>
        <title>Спасибо за заказ — Полимер-проект</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Icon name="CheckCircle" size={64} className="mx-auto text-green-500" />
      <h2 className="text-2xl sm:text-3xl font-bold">Спасибо за заказ!</h2>
      <p className="text-muted-foreground">Оплата проходит проверку. Мы свяжемся с вами по телефону или email, чтобы подтвердить заказ и согласовать доставку.</p>
      <div className="flex gap-3 justify-center pt-2">
        <Button onClick={() => navigate('/catalog')}>Вернуться в каталог</Button>
        <Button variant="outline" onClick={() => navigate('/')}>На главную</Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
