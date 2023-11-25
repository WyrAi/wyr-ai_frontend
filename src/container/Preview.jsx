/* eslint-disable react/prop-types */

const Preview = ({photos, check, onChange}) => {
	console.log(check, photos.length);
	return (
		<>
			{check && (
				<div>
					<div className="absolute inset-0 bg-transparent h-full ">
						<div className="  p-8 grid gap-4">
							<div>
								<h1 className="text-white mr-36 text-3xl">{photos.title}</h1>

								<button
									onClick={() => onChange(false)}
									className="fixed right-12 bg-gray-300 py-2 px-4 rounded-full shadow shadow-black"
								>
									X
								</button>
							</div>
							<img
								className="min-w-[40rem] max-h-[40rem] m-auto aspect-square object-contain"
								src={photos}
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
