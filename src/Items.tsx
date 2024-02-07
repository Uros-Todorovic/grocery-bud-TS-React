import React from 'react';
import { Item } from './App.tsx';
import SingleItem from './SingleItem.tsx';

type ItemsProps = {
	items: Item[];
	onRemoveItem: (itemID: string) => void;
	onEditItem: (itemID: string) => void;
};

const Items = ({ items, onRemoveItem, onEditItem }: ItemsProps) => {
	return (
		<div className="items">
			{items.map((item) => {
				return <SingleItem item={item} key={item.id} onremoveItem={onRemoveItem} onEditItem={onEditItem} />;
			})}
		</div>
	);
};

export default Items;
