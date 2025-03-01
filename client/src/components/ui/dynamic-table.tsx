import React from 'react';
import { TableData } from '@/types/table';
import {ChevronDown, ChevronUp} from "lucide-react";

interface DynamicTableProps {
    data: TableData[];
    onRowClick: (row: TableData) => void;
    onSort: (key: keyof TableData) => void;
    onEdit: (id: string, key: keyof TableData, value: string) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: string) => void;
    onContextMenu: (e: React.MouseEvent, row: TableData) => void;
    sortConfig: { key: keyof TableData | null; direction: 'asc' | 'desc' };
}

const DynamicTable: React.FC<DynamicTableProps> = ({
                                                       data,
                                                       onRowClick,
                                                       onSort,
                                                       onEdit,
                                                       onDelete,
                                                       onStatusChange,
                                                       onContextMenu,
                                                       sortConfig
                                                   }) => {
    return (
        <table className="w-full text-left border-collapse border border-slate-700">
            <thead>
            <tr className="bg-slate-800">
                {Object.keys(data[0] || {}).map((key) => (
                    <th
                        key={key}
                        className="border border-slate-700 px-4 py-2 cursor-pointer hover:bg-slate-700"
                        onClick={() => onSort(key as keyof TableData)}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        {sortConfig.key === key && (
                            <span className="ml-2">
                                    {sortConfig.direction === 'asc' ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </span>
                        )}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, rowIndex) => (
                <tr
                    key={rowIndex}
                    className={`hover:bg-slate-700 ${rowIndex % 2 ? 'bg-slate-800' : 'bg-slate-900'}`}
                    onClick={() => onRowClick(item)}
                    onContextMenu={(e) => onContextMenu(e, item)} // Handle right-click
                >
                    {Object.keys(item).map((key, colIndex) => (
                        <td key={colIndex} className="border border-slate-700 px-4 py-2">
                            {key !== 'id' ? (
                                key !== 'status' ? (
                                    <input
                                        value={String(item[key])}
                                        onChange={(e) => onEdit(item.id, key as keyof TableData, e.target.value)}
                                        className="bg-transparent text-white border-none focus:outline-none w-full"
                                    />
                                ) : (
                                    <select
                                        value={item[key] as string}
                                        onChange={(e) => onStatusChange(item.id, e.target.value)}
                                        className="bg-transparent text-white border-none focus:outline-none w-full"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                )
                            ) : (
                                <span>{item[key]}</span> // 'id' cannot be edited
                            )}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;
