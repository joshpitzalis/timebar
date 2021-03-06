import React from 'react';
export const Redirect = () => {
  return (
    <section className="ph3 ph5-ns pv5">
      <article className="mw9 center br2 ba b--light-blue bg-lightest-blue">
        <div className="dt-ns dt--fixed-ns w-100">
          <div className="pa3 pa4-ns dtc-ns v-mid">
            <div>
              <h2 className="fw4 blue mt0 mb3">Have a Question? </h2>
              <p className="black-70 measure lh-copy mv0">
                All discussion happens in our chatroom, jump and introduce
                yourself.
              </p>
            </div>
          </div>
          <div className="pa3 pa4-ns dtc-ns v-mid">
            <a
              href="#"
              className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2"
            >
              Go to Slack
            </a>
          </div>
        </div>
      </article>
    </section>
  );
};
