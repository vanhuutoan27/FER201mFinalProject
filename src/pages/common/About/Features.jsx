import React from 'react';

function Features() {
  return (
    <div className="stats" style={{ padding: '70px 0' }}>
      <div className="content">
        <div className="row">
          <div className="img-block">
            <img
              className="image"
              src="../assets/images/john-schnobrich-2FPjlAyMQTA-unsplash.jpg"
              alt="Streamlined Collaboration"
              style={{ width: '100%', height: 'auto', marginTop: '10px' }}
            />
          </div>
          <div className="info" style={{ padding: '80px 0 0 40px' }}>
            <h2 className="sub-title" style={{ fontSize: '3.2rem' }}>
              Streamlined Collaboration
            </h2>
            <p className="desc">
              Experience seamless collaboration among your team members with our integrated tools
              and services. We empower your company to work together efficiently.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="info" style={{ padding: '100px 40px 0 0' }}>
            <h2 className="sub-title" style={{ fontSize: '3.2rem' }}>
              Efficient Communication
            </h2>
            <p className="desc">
              Simplify communication within your organization with our efficient tools and services.
              We ensure effective information sharing, saving you time for more important tasks.
            </p>
          </div>

          <div className="img-block">
            <img
              className="image"
              src="../assets/images/austin-distel-wD1LRb9OeEo-unsplash.jpg"
              alt="Efficient Communication"
              style={{ width: '100%', height: 'auto', marginTop: '10px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
