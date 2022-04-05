import Sidebar from '../components/Sidebar';


const Home = () => {
	return (
		<div className="">

			<main className='bg-black h-screen overflow-hidden'>
				<Sidebar />
				{/* center */}
			</main>
			<div>{/* player */}</div>
		</div>
	);
};

export default Home;
