import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faWallet,
  faThumbsUp,
  faSquareCheck,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import './Detail.css';

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

function Detail() {
  useEffect(() => {
    const faqs = document.querySelectorAll('.faq');

    faqs.forEach((faq) => {
      faq.addEventListener('click', () => {
        faq.classList.toggle('active');
      });
    });
  }, []);
  return (
    <div className="DetailPage">
      <Navigation />
      <div>
        <div className="hero">
          <div className="content">
            <div className="hero-content">
              <div className="info">
                <p className="sub-title">Welcome to 4Stu Website!</p>
                <h1 className="title">Clean, tidy and economical</h1>
                <p className="desc">
                  Here we have all the cleaning, sanitation, water delivery services you need.
                </p>
                <a href="service" className="btn hero-cta cta">
                  Start Booking NOW
                </a>
              </div>

              <img
                src="../assets/images/people-start-booking-a-service-in-website-2.svg"
                alt="Clean, tidy and economical"
                className="hero-img"
              />
            </div>
          </div>
        </div>
        <div class="service-detail-container">
          <div class="banner"></div>
          <div class="content">
            <div class="column-service-detail">
              <h2>Why Should You Use 4Stu's Services?</h2>
              <div class="elementor-image">
                <img src="./assets/images/free & FAst delivery service.svg" alt="" />
              </div>
              <div class="box-content">
                <div class="box">
                  <div class="img-title">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div class="detail-tile">
                    <h3>Save Time</h3>
                    <p>
                      You don't need to waste time cleaning or getting your own water when staying
                      in a student apartment. Everything has support staff to help you through 4Stu.
                    </p>
                  </div>
                </div>
                <div class="box">
                  <div class="img-title">
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </div>
                  <div class="detail-tile">
                    <h3>Suitable For All</h3>
                    <p>
                      Our services are designed to simplify your daily life, giving you more time to
                      focus on your studies and enjoy your student experience to the fullest.
                    </p>
                  </div>
                </div>
                <div class="box">
                  <div class="img-title">
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </div>
                  <div class="detail-tile">
                    <h3>Quality Service</h3>
                    <p>
                      We offer top-notch service packages tailored specifically for student
                      apartments. Our commitment to quality ensures that you receive services that
                      meet and exceed your expectations.
                    </p>
                  </div>
                </div>
                <div class="box">
                  <div class="img-title">
                    <FontAwesomeIcon icon={faWallet} />
                  </div>
                  <div class="detail-tile">
                    <h3>Transparent Prices</h3>
                    <p>
                      We believe in transparency, and our pricing reflects that. You'll always know
                      what you're paying for, with no hidden fees or surprises.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="Register-Now">
            <div class="tilte-register">
              <h1>Đăng ký ngay hôm nay</h1>
              <p class="tilte-for-register">
                Bạn đã sẵn sàng trải nghiệm bTaskee chưa? Bắt đầu ngay với việc đặt lịch đi chợ để
                nhận ngay ưu đãi dành cho bạn
              </p>
              <div class="button-voucher">
                <a href="" className="btn">
                  Nhận ưu đãi
                </a>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="column-service-detail">
              <h2>Đội ngũ nhân viên của 4Stu là ai?</h2>
              <div class="box-content-2">
                <div class="box2">
                  <div class="img-title">
                    <img src="" alt="" />
                  </div>
                  <div class="detail-tile3">
                    <div>
                      <FontAwesomeIcon icon={faCheck} /> Employees with many years of experience.
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheck} /> People who are not afraid of sun or rain to
                      carry out their duties.
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheck} /> People who are careful and meticulous in
                      their work.
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheck} /> Reliable and highly responsible for work.
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCheck} /> Always friendly and close to customers.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="background-clear">
            <div class="content">
              <div class="service-price">
                <div class="service-for-price">
                  <h2>Giá dịch vụ</h2>
                </div>
                <div class="Non-rational">
                  <h3 class="title-price">Phí dịch vụ</h3>
                  <h3 class="price">50,000 VND</h3>
                </div>
                <hr />
                <div class="check-note">
                  <div class="note">
                    <div>
                      <i class="fa-solid fa-circle-exclamation"></i>Lưu ý
                    </div>
                  </div>
                  <div class="title-note">
                    <p>* Đối với Hồ Chí Minh phí đi chợ hộ là 80,000vnd/h.</p>
                    <p>* Từ 5km trở đi, khách hàng chịu phụ thu thêm 3.000 VND/km.</p>
                    <p>
                      * Khách hàng sử dụng dịch vụ lần đầu tiên phải cọc 200.000 đồng trong tài
                      khoản bPay – tài khoản thanh toán trong ứng dụng bTaskee.
                    </p>
                    <p>* Giá mang tính chất tham khảo ở thời điểm hiện tại.</p>
                    <p>
                      * Giá dịch vụ có thể tự động điều chỉnh tùy vào khu vực, cuối tuần, giờ cao
                      điểm (trước 8h và sau 17h) hay lễ tết.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="box-content-3">
              <div class="box3">
                <div class="img-title">
                  <img src="./assets/img/download-asker-btaskee-ver-3.png" alt="" />
                </div>
                <div class="detail-tile3">
                  <h3>
                    Bạn đã sẵn sàng để <br />
                    trải nghiệm?
                  </h3>
                  <p>
                    Tải, đăng ký và trải nghiệm những tính năng thú vị chỉ có trên Ứng dụng bTaskee.
                  </p>
                  <button>Nhận ưu đãi ngay</button>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <section>
              <h2 class="title-faq">FAQS</h2>
              <div class="faq">
                <div class="question">
                  <h3>What is 4stu?</h3>
                  <i class="fas fa-plus"></i>
                </div>
                <div class="answer">
                  <p>
                    4stu is a Student House Service that allows students to easily manage their
                    accounts, access services, and stay up-to-date on the latest news and events.
                  </p>
                </div>
              </div>

              <div class="faq">
                <div class="question">
                  <h3>What is the meaning of 4stu?</h3>
                  <i class="fas fa-plus"></i>
                </div>
                <div class="answer">
                  <p>
                    Basically, the services we provide are mainly for students, so the meaning of
                    the company name is for student
                  </p>
                </div>
              </div>

              <div class="faq">
                <div class="question">
                  <h3>What services can I access through 4stu?</h3>
                  <i class="fas fa-plus"></i>
                </div>
                <div class="answer">
                  <p>
                    4stu allows you to access a variety of services, including: Water delivery,
                    Cooking services, Laundry services, Housekeeping services, Medical services.
                  </p>
                </div>
              </div>

              <div class="faq">
                <div class="question">
                  <h3>How do I pay for services through 4stu?</h3>
                  <i class="fas fa-plus"></i>
                </div>
                <div class="answer">
                  <p>
                    You can pay for services through 4stu using a variety of payment methods,
                    including credit cards, debit cards, MOMO, and cash.
                  </p>
                </div>
              </div>

              <div class="faq">
                <div class="question">
                  <h3>How do I contact 4stu customer support?</h3>
                  <i class="fas fa-plus"></i>
                </div>
                <div class="answer">
                  <p>
                    If you have any questions or need assistance, you can contact 4stu customer
                    support by email: 4stuSupport@gmail.com or phone: 1900 0505 26
                  </p>
                </div>
              </div>

              <div class="faq">
                <div class="question">
                  <h3>How secure is 4stu?</h3>
                  <i class="fas fa-plus"></i>
                </div>
                <div class="answer">
                  <p>
                    4stu uses the latest security technologies to protect student data. All student
                    data is encrypted and stored on secure servers.
                  </p>
                </div>
              </div>

              <div class="faq">
                <div class="question">
                  <h3>What are the future plans for 4stu?</h3>
                  <i class="fas fa-plus"></i>
                </div>
                <div class="answer">
                  <p>
                    4stu is constantly working to improve. Some of the future plans for the company
                    include: Create a suitable app for both Android and IOS platforms Open new
                    services. Expanding the market
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <script src="./assets//js/service-detail.js"></script>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
