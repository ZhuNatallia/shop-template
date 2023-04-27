import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Filter from '../../components/Filter/Filter';
import Info from '../../components/Info/Info';
import Product from '../../components/Product/Product';
import styles from './catalogpage.module.css';
import productService from '../../services/products';
import ReactPaginate from 'react-paginate';

const CatalogPage = () => {
	const [products, setProducts] = useState([]);
	const [gridView, setGridView] = useState(true);
	const [sort, setSort] = useState('price');
	const [productOffset, setProductOffset] = useState(0);
	const productsPerPage = 4;
	const [forcePage, setForcePage] = useState(0);

	const endOffset = productOffset + productsPerPage;
	console.log(`Loading items from ${productOffset} to ${endOffset}`);
	const currentProducts = products.slice(productOffset, endOffset);
	const pageCount = Math.ceil(products.length / productsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * productsPerPage) % products.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setForcePage(event.selected);
		setProductOffset(newOffset);
	};

	useEffect(() => {
		productService.getProducts().then((res) => {
			const sortedByPrice = res.data.sort((a, b) => a.price - b.price);
			setProducts(sortedByPrice);
		});
	}, []);

	useEffect(() => {
		if (sort === 'price') {
			const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
			setProducts(sortedByPrice);
		} else {
			const sortedByDate = [...products].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setProducts(sortedByDate);
		}
		setForcePage(0);
		setProductOffset(0);
		//функция сортировки
	}, [sort]);

	return (
		<div>
			<Breadcrumbs title='Shop' />
			<Filter setGridView={setGridView} sort={sort} setSort={setSort} />
			<div className={styles['products-wrapper']}>
				{currentProducts.map((product) => {
					return (
						<Product
							key={product._id}
							id={product._id}
							img={product.img}
							title={product.title}
							price={product.price}
							date={product.createdAt}
							gridView={gridView}
						/>
					);
				})}
			</div>

			<ReactPaginate
				forcePage={forcePage}
				breakLabel='...'
				nextLabel='next >'
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel='' /* '< previous' */
				renderOnZeroPageCount={null}
				containerClassName={styles['pagination-wrapper']}
				pageLinkClassName={styles['pagination-page']}
				nextClassName={styles['pagination-next']}
				activeLinkClassName={styles['pagination-active']}
			/>
			<Info />
		</div>
	);
};

export default CatalogPage;
