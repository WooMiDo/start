import React from "react";
import { Table, Input, Select } from "antd";
import { useEffect, useState } from "react";
import "./index.css";

/**
 ******************************* Type3 **********************************
 *
 * */

const Type3 = () => {
  //컬럼 명
  const columns = [
    Table.SELECTION_COLUMN, //체크박스
    {
      title: "키워드",
      dataIndex: "keyword",
      sorter: true,
    },
    {
      title: "노출수",
      dataIndex: "exposeNum",
      sorter: true,
      align: "right",
    },
    {
      title: "ROAS",
      dataIndex: "roas",
      sorter: true,
      align: "right",
    },
  ];
  //실제 데이터
  const defaultdata = [];
  for (let i = 1; i <= 19; i++) {
    defaultdata.push({
      key: i,
      keyword: `방수천-${i}`,
      exposeNum: `${i}2`,
      roas: `${i}10`,
      description: "초기값",
    });
  }

  //총 합계 계산
  const [grandTotal, setGrandTotal] = useState({
    key: "total",
    keyword: "총 합계",
    exposeNum: defaultdata.reduce(
      (total, item) => total + Number(item.exposeNum),
      0
    ),
    roas: defaultdata.reduce((total, item) => total + Number(item.roas), 0),
    className: "total-row",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); //로딩 상태 : false(초기값)
  //테이블 상태(현재 페이지:1, 페이지당 항목 수: 3)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    //정렬
    sorter: {
      field: "", //필드 (정렬할 항목)
      order: "", //순서
    },
  });

  const handleTableChange = (pagination, _, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
      sorter,
    });

    // if (searchText) {
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const slicedData = data.slice(startIndex, endIndex);

    const updatedGrandTotal = {
      key: "total",
      keyword: "총 합계",
      exposeNum: slicedData.reduce(
        (total, item) => total + Number(item.exposeNum),
        0
      ),
      roas: slicedData.reduce((total, item) => total + Number(item.roas), 0),
      className: "total-row",
    };
    setData([...slicedData, updatedGrandTotal]);
    console.log(updatedGrandTotal);
    console.log(slicedData);
    // }
  };

  useEffect(() => {
    setLoading(true); //로딩상태 : true

    const sortedData = [...defaultdata]; //초기값 복사
    const { field, order } = tableParams.sorter;

    //정렬
    if (field && order) {
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "ascend"
            ? aValue.localeCompare(bValue, undefined, { numeric: true })
            : bValue.localeCompare(aValue, undefined, { numeric: true });
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "ascend" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    // setData(sortedData);
    setLoading(false);
    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        total: sortedData.length, //정렬된 데이터 길이
      },
    }));

    const updatedGrandTotal = {
      key: "total",
      keyword: "총 합계",
      exposeNum: sortedData.reduce(
        (total, item) => total + Number(item.exposeNum),
        0
      ),
      roas: sortedData.reduce((total, item) => total + Number(item.roas), 0),
      className: "total-row",
    };

    setGrandTotal(updatedGrandTotal);
    setData([...sortedData, updatedGrandTotal]);
  }, [tableParams.sorter, tableParams.pagination.pageSize]); //정렬옵션 변경할 때마다 실행

  const { Search } = Input;
  const [searchText, setSearchText] = useState("");

  //총합행 클래스 이름 지정
  const rowClassName = (record) => {
    return record.key === "total" ? "total-row" : null;
  };

  //검색기능
  const onSearch = (value) => {
    setSearchText(value);
    const filteredData = defaultdata.filter((item) => {
      const itemValues = Object.values(item); //item개체에 있는 모든 값의 배열
      return itemValues.some((itemValue) =>
        itemValue.toString().toLowerCase().includes(value.toLowerCase())
      );
    });

    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current: 1,
        total: filteredData.length,
      },
    }));

    const updatedGrandTotal = {
      key: "total",
      keyword: "총 합계",
      exposeNum: filteredData.reduce(
        (total, item) => total + Number(item.exposeNum),
        0
      ),
      roas: filteredData.reduce((total, item) => total + Number(item.roas), 0),
      className: "total-row",
    };

    setGrandTotal(updatedGrandTotal);

    setData([...filteredData, updatedGrandTotal]);
  };

  //pageSize 변경
  const handlePageSizeChange = (value) => {
    const totalItems = defaultdata.length + 1;
    const pageSize = value === 40 ? totalItems + 1 : value;

    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        pageSize: pageSize,
      },
    }));
  };

  return (
    <div className="type3Div">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div className="selectText">
          <Select
            defaultValue={{ value: 10, label: "10개씩 보기" }}
            className="selectBox"
            options={[
              { value: 10, label: "10개씩 보기" },
              { value: 20, label: "20개씩 보기" },
              { value: 30, label: "30개씩 보기" },
              { value: 40, label: "전체 보기" },
            ]}
            onChange={handlePageSizeChange}
          />
          조회된 항목 수 : {data.length - 1}
        </div>
        <div>
          <Search
            placeholder="검색"
            onSearch={onSearch}
            className="searchBtn"
          />
        </div>
      </div>
      <Table
        id="table"
        pagination={tableParams.pagination}
        columns={columns}
        // dataSource={data ? [...data, grandTotal] : []}
        dataSource={data}
        rowSelection={{
          getCheckboxProps: (record) => ({
            disabled: record.key === "total",
          }),
        }}
        loading={loading}
        onChange={handleTableChange}
        rowClassName={rowClassName}
      />
    </div>
  );
};

//원하는 데이터그리드 컴포넌트 출력
const DataGridComponent = () => {
  return (
    <div>
      <Type3 />
    </div>
  );
};

export default DataGridComponent;
