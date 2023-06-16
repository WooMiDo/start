import React from "react";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";

/**
 ******************************* Type1 **********************************
 *
 * */

//컬럼 명

const Type1 = () => {
  const columns = [
    {
      title: "광고주",
      dataIndex: "name",
      align: "center",
      style: { borderBottom: "2px solid #000" },
    },
    {
      title: "통계",
      dataIndex: "stats",
      align: "center",
      render: (text) => <button className="button">{text}</button>,
    },
    {
      title: "총 광고비",
      dataIndex: "totalAd",
      align: "right",
    },
    {
      title: "총 광고비 (이전기간)",
      dataIndex: "tatalAdPrev",
      align: "right",
    },
    {
      title: "ROAS(%)",
      dataIndex: "roas",
      align: "right",
    },
    {
      title: "ROAS(%) (이전기간)",
      dataIndex: "roasPrev",
      align: "right",
    },
  ];

  //실제 데이터
  const data = [
    {
      key: "1",
      name: "쿠팡",
      stats: "상세보기",
      totalAd: "2,223,526원",
      tatalAdPrev: "2,223,526원",
      roas: "110%",
      roasPrev: "110%",
    },
    {
      key: "2",
      name: "쿠팡",
      stats: "상세보기",
      totalAd: "1,223,526원",
      tatalAdPrev: "1,223,526원",
      roas: "120%",
      roasPrev: "120%",
    },
    {
      key: "3",
      name: "쿠팡",
      stats: "상세보기",
      totalAd: "3,223,526원",
      tatalAdPrev: "3,223,526원",
      roas: "100%",
      roasPrev: "100%",
    },
  ];

  //홀수열과 짝수열에 클래스 이름 지정 (배경색 다르게 하기 위해서)
  const rowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  return (
    <div className="type1Div">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        rowClassName={rowClassName}
      />
    </div>
  );
};

/**
 ******************************* Type2 **********************************
 *
 * */

const Type2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorter: {
      field: "",
      order: "",
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
      sorter,
    });
  };

  useEffect(() => {
    setLoading(true);

    // Sorting the defaultdata based on tableParams
    const sortedData = [...defaultdata];
    const { field, order } = tableParams.sorter;

    if (field && order) {
      sortedData.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "ascend"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "ascend" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    // Update the data and pagination total
    setData(sortedData);
    setLoading(false);
    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        total: sortedData.length,
      },
    }));
  }, [tableParams]);

  const handleAdd = () => {};

  const defaultdata = [
    {
      key: 1,
      name: "John Brown 1",
      age: 1,
      address: "New York No. 1 Lake Park",
      email: "abc1231@bizspring.com",
    },
    {
      key: 2,
      name: "John Brown 2",
      age: 2,
      address: "New York No. 2 Lake Park",
      email: "abc1232@bizspring.com",
    },
    {
      key: 3,
      name: "John Brown 3",
      age: 3,
      address: "New York No. 3 Lake Park",
      email: "abc1233@bizspring.com",
    },
    {
      key: 4,
      name: "John Brown 4",
      age: 4,
      address: "New York No. 4 Lake Park",
      email: "abc1234@bizspring.com",
    },
    {
      key: 5,
      name: "John Brown 5",
      age: 5,
      address: "New York No. 5 Lake Park",
      email: "abc1235@bizspring.com",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
  ];

  return (
    <div className="type2Div">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <div>
          <span style={{ marginRight: 8 }}>Search:</span>
          <input type="text" style={{ marginRight: 8 }} />
          <Button className="button">Excel</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

//원하는 데이터그리드 컴포넌트 출력
const DataGridComponent = () => {
  return (
    <div>
      <Type2 />
      <Type1 />
    </div>
  );
};

export default DataGridComponent;
