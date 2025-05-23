import React from "react";
import {
  Box,
  Pagination,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onLimitChange: (event: SelectChangeEvent<number>) => void;
  limitOptions?: number[];
  showItemsPerPage?: boolean;
  showItemsInfo?: boolean;
  className?: string;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  limit,
  total,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 30, 50],
  showItemsPerPage = true,
  showItemsInfo = true,
  className = "",
}) => {
  // Calculate the range of items being shown
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  // Don't render pagination if there are no items
  if (total === 0) {
    return null;
  }

  return (
    <Box
      className={`mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      {/* Items per page selector */}
      {showItemsPerPage && (
        <Box className="flex items-center gap-2">
          <Typography variant="body2">Items per page:</Typography>
          <Select
            value={limit}
            onChange={onLimitChange}
            size="small"
            className="bg-white"
          >
            {limitOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      {/* Pagination controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        shape="rounded"
      />

      {/* Items info */}
      {showItemsInfo && (
        <Typography variant="body2">
          Showing {startItem}-{endItem} of {total} items
        </Typography>
      )}
    </Box>
  );
};

export default PaginationComponent;
