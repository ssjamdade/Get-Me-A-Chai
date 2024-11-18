

export default function Home() {
  <script src="https://cdn.lordicon.com/lordicon.js"></script>
  return (
    <>
      <div className="text-white flex flex-col items-center space-y-7">

        <div className="flex justify-center items-end gap-4">

          <h1 className="text-4xl font-bold mt-12">Buy Me a Chai </h1>

          <img className="bg-blue-300 rounded-lg" src="https://i.pinimg.com/originals/a3/7d/03/a37d03e9e6ad102a4f84c77413ac2673.gif" alt="" width={45} />
        </div>

        <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start Now!</p>

        <div className="btn">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>

          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>

        </div>
      </div>
      <div className="h-1 bg-slate-800 mt-10 "></div>

      <div className="text-white container mx-auto  flex flex-col">
        <h2 className="text-center font-bold text-xl my-10">Your fans can buy you a Chai</h2>

        <div className=" flex justify-center gap-28">
          <div className="flex flex-col items-center justify-center space-y-2">
            <img src="https://cdnl.iconscout.com/lottie/premium/thumb/man-working-while-sitting-on-desk-animation-download-in-lottie-json-gif-static-svg-file-formats--laptop-using-table-at-office-people-mobile-and-pack-animations-4596736.gif" alt="" width={45} className="rounded-full" />
            <h3>Fans want to help?</h3>
            <p className="text-gray-400">Your fans are available for you to help you</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <img src="https://cdn.pixabay.com/animation/2023/03/23/17/00/17-00-52-997_512.gif" alt="" width={80} className="rounded-full" />
            <h3>Fans want to help?</h3>
            <p className="text-gray-400">Your fans are available for you to help you</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <img src="https://cdn.dribbble.com/users/132658/screenshots/14228126/media/1489a46d460a08048999d40ac44f3491.gif" alt="" width={65} className="rounded-full" />
            <h3>Fans want to help?</h3>
            <p className="text-gray-400">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="h-1 bg-slate-800 mt-10 "></div>

      <div className="text-white container mx-auto  flex flex-col">
        <h2 className="text-center font-bold text-xl my-10">Learn More About Us</h2>

        <div className=" flex justify-center gap-28">
          <iframe width="400" height="255" src="https://www.youtube.com/embed/cMzulLA1_Hw?si=8g808_pHOXsFCOcu" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

    </>
  );
}
