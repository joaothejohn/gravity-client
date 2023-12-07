import React, { useReducer, useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure,
  Skeleton
} from "@nextui-org/react";
import ModalInput from '@/components/shared/ModalInput';
import { PlusIcon } from "../icons/PlusIcon";
import { GearIcon } from "../icons/GearIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { capitalize } from "../../utils/capitalize";
import { columns, statusOptions } from "./data";
import { IPlan } from "types";

const statusColorMap: Record<string, ChipProps["color"]> = {
  "true": "success",
  "false": "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["username", "password", "id", "ip", "isActive", "plan.name", "actions"];

type User = {
  username: string;
  password: string;
  id: string;
  ip: string;
  isActive: string;
  plan: {
    name: string;
    id: string;
  };
  actions: string;
};

type State = {
  filterValue: string;
  selectedKeys: Selection;
  visibleColumns: Selection;
  statusFilter: Selection;
  rowsPerPage: number;
  sortDescriptor: SortDescriptor;
  page: number;
};

type Action =
  | { type: 'SET_FILTER_VALUE'; payload: string }
  | { type: 'SET_SELECTED_KEYS'; payload: Selection }
  | { type: 'SET_VISIBLE_COLUMNS'; payload: Selection }
  | { type: 'SET_STATUS_FILTER'; payload: Selection }
  | { type: 'SET_ROWS_PER_PAGE'; payload: number }
  | { type: 'SET_SORT_DESCRIPTOR'; payload: SortDescriptor }
  | { type: 'SET_PAGE'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FILTER_VALUE':
      return { ...state, filterValue: action.payload };
    case 'SET_SELECTED_KEYS':
      return { ...state, selectedKeys: action.payload };
    case 'SET_VISIBLE_COLUMNS':
      return { ...state, visibleColumns: action.payload };
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload };
    case 'SET_ROWS_PER_PAGE':
      return { ...state, rowsPerPage: action.payload };
    case 'SET_SORT_DESCRIPTOR':
      return { ...state, sortDescriptor: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

const initialState: State = {
  filterValue: "",
  selectedKeys: new Set([]),
  visibleColumns: new Set(INITIAL_VISIBLE_COLUMNS),
  statusFilter: "all",
  rowsPerPage: 10,
  sortDescriptor: {
    column: "age",
    direction: "ascending",
  },
  page: 1,
};

export default function RadiusUserCard({ providerInfo, plansInfo, loading }: { providerInfo: User[], plansInfo: IPlan[], loading: boolean }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState);

  const hasSearchFilter = Boolean(state.filterValue);

  const headerColumns = useMemo(() => {
    if (state.visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(state.visibleColumns).includes(column.uid));
  }, [state.visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...providerInfo];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(state.filterValue.toLowerCase()),
      );
    }
    if (state.statusFilter !== "all" && Array.from(state.statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) => {
        return Array.from(state.statusFilter).includes(user.isActive);
      });
    }

    return filteredUsers;
  }, [providerInfo, hasSearchFilter, state.statusFilter, state.filterValue]);

  const pages = Math.ceil(filteredItems.length / state.rowsPerPage);

  const items = useMemo(() => {
    const start = (state.page - 1) * state.rowsPerPage;
    const end = start + state.rowsPerPage;

    return filteredItems.slice(start, end);
  }, [state.page, filteredItems, state.rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[state.sortDescriptor.column as keyof User] as unknown as number;
      const second = b[state.sortDescriptor.column as keyof User] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return state.sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [state.sortDescriptor, items]);

  const renderHiddenCharacters = (value: string) => {
    const lengthToShow = 5;
    const hiddenCharacters = value.slice(1, -1).replace(/./g, '*');

    return value.slice(0, 1) + hiddenCharacters.slice(0, lengthToShow) + value.slice(-1);
  };

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "username":
        return (
          <User
            name={user.username}
            avatarProps={{
              src: `https://source.boringavatars.com/pixel/120/${user.username}?colors=264653,2a9d8f,f4a261,e76f51`
            }}
            description="50-Mbps"
          />
        );
      case "plan.name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.plan.name}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.plan.id}</p>
          </div>
        );
      case "password":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{typeof cellValue === 'string' ? renderHiddenCharacters(cellValue) : ''}</p>
          </div>
        );
      case "ip":
        return (
          <Chip className="capitalize" color={statusColorMap[cellValue as keyof typeof statusColorMap]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "isActive":
        return (
          <Chip className="capitalize" color={statusColorMap[cellValue as keyof typeof statusColorMap]} size="sm" variant="flat">
            {cellValue ? 'Active' : 'Inactive'}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <GearIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (state.page < pages) {
      dispatch({ type: 'SET_PAGE', payload: state.page + 1 });
    }
  }, [state.page, pages]);

  const onPreviousPage = useCallback(() => {
    if (state.page > 1) {
      dispatch({ type: 'SET_PAGE', payload: state.page - 1 });
    }
  }, [state.page]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_ROWS_PER_PAGE', payload: Number(e.target.value) });
    dispatch({ type: 'SET_PAGE', payload: 1 });
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      dispatch({ type: 'SET_FILTER_VALUE', payload: value });
      dispatch({ type: 'SET_PAGE', payload: 1 });
    } else {
      dispatch({ type: 'SET_FILTER_VALUE', payload: "" });
    }
  }, []);

  const onClear = useCallback(() => {
    dispatch({ type: 'SET_FILTER_VALUE', payload: "" });
    dispatch({ type: 'SET_PAGE', payload: 1 });
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <ModalInput open={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} plansInfo={plansInfo} />
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={state.filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={state.statusFilter}
                selectionMode="multiple"
                onSelectionChange={(keys) => dispatch({ type: 'SET_STATUS_FILTER', payload: keys })}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.name} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={state.visibleColumns}
                selectionMode="multiple"
                onSelectionChange={(keys) => dispatch({ type: 'SET_VISIBLE_COLUMNS', payload: keys })}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} onClick={onOpen}>
              Add New Customer
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {providerInfo.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [isOpen, onOpen, onOpenChange, state.filterValue, onSearchChange, state.statusFilter, state.visibleColumns, providerInfo.length, onRowsPerPageChange, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {state.selectedKeys === "all"
            ? "All items selected"
            : `${state.selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={state.page}
          total={pages}
          onChange={(page) => dispatch({ type: 'SET_PAGE', payload: page })}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [state.selectedKeys, filteredItems.length, state.page, pages, onPreviousPage, onNextPage]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[680px]",
      }}
      selectedKeys={state.selectedKeys}
      sortDescriptor={state.sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={(keys) => dispatch({ type: 'SET_SELECTED_KEYS', payload: keys })}
      onSortChange={(descriptor) => dispatch({ type: 'SET_SORT_DESCRIPTOR', payload: descriptor })}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={!loading && sortedItems.length === 0 ? "No users found" : " "} items={sortedItems} isLoading={loading} loadingContent={(
        <div className="w-full flex p-10 items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-20 h-20"/>
          </div>  
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 rounded-lg"/>
            <Skeleton className="h-3 rounded-lg"/>
            <Skeleton className="h-3 rounded-lg"/>
          </div>
        </div>
      )}>
        {(item) => {
          return (
            <TableRow key={item.id}>
              {(columnKey) => {
                return (
                  <TableCell>{renderCell(item, columnKey) as any}</TableCell>
                )
              }}
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  );
}