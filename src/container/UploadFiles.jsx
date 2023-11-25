/* eslint-disable react/prop-types */
import {useState} from 'react';
import upload1 from '../assets/formkit_uploadcloud1.svg';
import cross from '../assets/typcn_delete-outline.svg';

const UploadFiles = ({title, fileUpload, setFileUpload}) => {
	// ** in this file add id to the fileUpload state , now just using names as id ** //
	// const [fileUpload, setFileUpload] = useState([]);
	// const [files, setFiles] = useState([]); // Dummy files array
	// const [base64String, setBase64String] = useState('');
	// Function to handle file selection
	const handleFileChange = (e) => {
		// Add file logic
		const file = e.target.files[0];
		console.log(file);

		if (file) {
			const reader = new FileReader();
			// let result = null;
			reader.onload = (e) => {
				setFileUpload([
					...fileUpload,
					{
						id: fileUpload.length + 1,
						base64String: e.target.result,
						name: file.name,
					},
				]);
			};
			reader.readAsDataURL(file);
			// setFiles([...files, {id: files.length + 1, name: file.name}]);
		}
	};
	console.log(fileUpload);

	// Function to remove file from list
	const removeFile = (fileID) => {
		// setFiles(files.filter((file) => file.id !== fileID));
		setFileUpload(fileUpload.filter((file) => file.id !== fileID));
	};

	return (
		<>
			<div className=" absolute top-[0%] h-screen w-screen  bg-[#00000080] pt-[100px]">
				<div className=" w-1/2 h-1/2 outline-dashed outline-gray-300 m-auto flex flex-col items-center justify-center p-4  bg-white">
					<div className="flex flex-col items-center mb-4 ">
						<div className=" ">
							<img src={upload1} alt="cloud" className="m-auto" />
							<p className="text-center">{title}</p>
						</div>
						<label className="relative cursor-pointer text-white  font-medium py-2 px-4 rounded">
							<input
								type="file"
								className="hidden"
								onChange={(e) => handleFileChange(e)}
							/>

							<span className="text-2xl font-bold text-blue  mt-2">Browse</span>
						</label>
					</div>

					<ul className="w-full overflow-auto">
						{fileUpload?.length > 0 &&
							fileUpload.map((file, index) => (
								<li
									key={index}
									className="flex items-center justify-between px-4 py-2 mb-2 border-b"
								>
									<span className="text-sm">{file.name}</span>
									<button
										className="text-red-500 hover:text-red-700 "
										onClick={() => removeFile(file.id)}
									>
										<img src={cross} alt="close" />
									</button>
								</li>
							))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default UploadFiles;

// &#x2715;
