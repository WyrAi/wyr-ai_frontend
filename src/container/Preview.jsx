/* eslint-disable react/prop-types */

const Preview = ({ photos, check, onChange }) => {
  // console.log(check, photos?.name);
  return (
    <>
      {photos && (
        <div>
          <div className=" h-[80vh] ">
            <div className="  p-8 grid md:grid-rows-[3rem_auto] gap-4 h-full">
              <div>
                <h1 className=" text-center text-3xl ">{photos?.name}</h1>
              </div>
              <img
                className="min-w-[70vh] h-full m-auto  object-contain"
                src={URL.createObjectURL(photos)}
              ></img>
              {/* {photos?.length > 0 ? (
								photos.map((photo, index) => (
									<div key={index}>
										<img
											className="min-w-[40rem] max-h-[40rem] m-auto aspect-square object-contain"
											src={photo.img}
										></img>
									</div>
								))
							) : (
								
							)} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preview;
