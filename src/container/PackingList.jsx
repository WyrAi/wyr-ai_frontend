import {useFormik} from 'formik';
import * as Yup from 'yup';
import DropZone from '../Components/DropZone';
import InputField from './InputField';
import addUser from '../assets/noun-add-account-6047901 1.svg';
import sample from '../assets/Rectangle 25.png';

const PackingList = () => {
	const initialValues = {
		from: '',
		to: '',
		styleId: '',
		styleName: '',
		quantityPerBox: '',
		totalBox: '',
		totalQuantity: '',
	};

	const validationSchema = Yup.object().shape({
		from: Yup.number()
			.required('Required')
			.positive('Must be positive')
			.integer('Must be an integer'),
		to: Yup.number()
			.required('Required')
			.positive('Must be positive')
			.integer('Must be an integer'),
		styleId: Yup.string().required('Required'),
		styleName: Yup.string().required('Required'),
		quantityPerBox: Yup.number()
			.required('Required')
			.positive('Must be positive')
			.integer('Must be an integer'),
		totalBox: Yup.number()
			.required('Required')
			.positive('Must be positive')
			.integer('Must be an integer'),
		totalQuantity: Yup.number()
			.required('Required')
			.positive('Must be positive')
			.integer('Must be an integer'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => handleSubmit(values),
		validationSchema,
	});

	async function handleSubmit(values) {
		try {
			console.log(values);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<div className=" grid md:grid-cols-9 gap-2 items-center">
				<div className=" h-12 w-12  mb-4 mx-auto ">
					<img src={sample} alt="photo" className="h-full w-full " />
				</div>
				<div>
					<InputField
						name={'from'}
						label={'From'}
						type="text"
						value={formik.values.from}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.from && formik.errors.from}
						placeholder={'1234'}
						labelColor={'bg-slimeGray'}
						labelsize={'text-[10px]'}
						padding={'py-2'}
					/>
				</div>
				<div className="">
					<InputField
						label="TO"
						name="to"
						type="text"
						value={formik.values.to}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.to && formik.errors.to}
						placeholder={'ST ED BC 3220 W'}
						labelColor={'bg-slimeGray'}
						labelsize={'text-[10px]'}
						padding={'py-2'}
					/>
				</div>
				<div className="">
					<InputField
						label={'Style Name'}
						name={'styleName'}
						type="text"
						value={formik.values.styleName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.styleName && formik.errors.styleName}
						placeholder={'BH1222 Marri Welcome'}
						labelColor={'bg-slimeGray'}
						labelsize={'text-[10px]'}
						padding={'py-2'}
					/>
				</div>

				<div className="">
					<InputField
						label="StyleId"
						name="styleId"
						type="text"
						value={formik.values.styleId}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.styleId && formik.errors.styleId}
						placeholder={'ST ED BC 3220 W'}
						labelColor={'bg-slimeGray'}
						labelsize={'text-[10px]'}
						padding={'py-2'}
					/>
				</div>
				<div className="">
					<InputField
						label={'Quantity per Box'}
						name={'quantityPerBox'}
						type="text"
						value={formik.values.quantityPerBox}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.quantityPerBox && formik.errors.quantityPerBox
						}
						placeholder={'BH1222 Marri Welcome'}
						labelColor={'bg-slimeGray'}
						labelsize={'text-[10px]'}
						padding={'py-2'}
					/>
				</div>
				<div className="">
					<InputField
						label={'Total Box'}
						name={'totalBox'}
						type="text"
						value={formik.values.totalBox}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.totalBox && formik.errors.totalBox}
						placeholder={'BH1222 Marri Welcome'}
						labelColor={'bg-slimeGray'}
						labelsize={'text-[10px]'}
						padding={'py-2'}
					/>
				</div>
				<div className="">
					<InputField
						label={'Total Quantity'}
						name={'totalQuantity'}
						type="text"
						value={formik.values.totalQuantity}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.totalQuantity && formik.errors.totalQuantity}
						placeholder={'BH1222 Marri Welcome'}
						labelColor={'bg-slimeGray'}
						labelsize={'text-[10px]'}
						padding={'py-2'}
					/>
				</div>
				<button className=" mb-8 " onClick={() => {}}>
					<span className="text-[10px]">Assign Factory</span>
					<img src={addUser} alt="add" className="w-6 h-6 m-auto" />
				</button>
			</div>
		</>
	);
};

export default PackingList;
