const DonationProcess = () => {
  return (
    <div className="max-w-screen-lg mx-auto my-20">
      <div className="mb-10 text-center text-3xl text-indigo-600">
        <h2>Donation Process</h2>
      </div>
      <div className="stats shadow ">
        <div className="stat place-items-center bg-indigo-600 text-white">
          <div className="stat-value">01</div>
          <div className="stat-value"> Registration</div>
        </div>

        <div className="stat place-items-center bg-pink-600 text-white">
          <div className="stat-value text-white">02 </div>
          <div className="stat-value text-white">Scaning </div>
        </div>

        <div className="stat place-items-center bg-indigo-600 text-white">
          <div className="stat-value">03</div>
          <div className="stat-value"> Donation</div>
        </div>

        <div className="stat place-items-center bg-pink-600 text-white">
          <div className="stat-value text-white">04 </div>
          <div className="stat-value text-white">Rest & Refresh </div>
        </div>
      </div>
    </div>
  );
};

export default DonationProcess;
