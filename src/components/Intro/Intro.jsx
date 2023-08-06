import m from "./Intro.module.scss";
import bigGirl from "../../assets/images/bigImg.svg";
import bigGirl1 from "../../assets/images/bigimg2.svg";
import card1 from "../../assets/images/catalog.svg";
import card2 from "../../assets/images/search.svg";

function Intro() {
  return (
    <section className={m.container}>
      <div className={m.wrapper}>
        <div className={m.section}>
          <div className={m.infoWrapper}>
            <h1 className={m.title}>Оплата услуг онлайн</h1>
            <p className={m.text}>
              Оплата за 2 секунды с любой точки мира, минимальная комиссия на
              оплату услуг с нашего приложение.
            </p>
          </div>
          <img className={m.img} src={bigGirl} alt="" />
        </div>
        <div className={m.section}>
          <img className={m.img} src={bigGirl1} alt="" />

          <div className={m.elementWrapper}>
            <div className={m.cardWrapper}>
              <img className={m.cardImg} src={card1} alt="" />
              <p className={m.cardText}>
                Наш сервис предоставляет удобную и надежную платформу для онлайн
                оплаты услуг. Мы стремимся обеспечить максимальную легкость и
                простоту процесса оплаты, чтобы наши клиенты могли быстро и
                безопасно оплачивать услуги в любое время и из любой точки мира.
              </p>
            </div>
            <div className={m.cardWrapper}>
              <p className={m.cardText}>
                Сотрудничество с нами гарантирует быструю обработку платежей,
                минимизацию рисков и прозрачность взаимодействия. Наша цель -
                сделать процесс оплаты услуг удобным и беззаботным для наших
                пользователей, чтобы они могли сосредоточиться на том, что
                действительно важно.
              </p>
              <img className={m.cardImg} src={card2} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
