import React from "react";
import theme from "../utils/theme";

interface Filter {
    label: string;
    value: string;
}

interface ViewSelectionProps {
    filters: Filter[];
    selectedFilter: string;
    onChange: (valor: string) => void;
}

const ViewSelectionFilter: React.FC<ViewSelectionProps> = ({  
    filters,
    selectedFilter,
    onChange,
}) => {
    console.log(filters, selectedFilter);
    return (
        <div style={{
            padding: "0.25rem",
            background: "#E3E3E3",
            width: 'fit-content',
            borderRadius: '0.31rem'
        }}>
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    style={{
                        padding: "0.438rem 1.188rem",
                        borderRadius: "0.313rem",
                        transition: "background 0.2s, color 0.2s",
                        background: selectedFilter === filter.value ? theme.palette.customBackground.secondary : "transparent",
                        color: selectedFilter === filter.value ? theme.palette.customText.black : theme.palette.customText.gray,
                        fontFamily: "Inter",
                        fontWeight: selectedFilter === filter.value ? "500" : "400",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={() => onChange(filter.value)}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default ViewSelectionFilter;