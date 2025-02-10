import React from 'react';

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
    return (
        <input
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search..."
            className="form-control mb-3"
        />
    );
}

export default SearchBar;
