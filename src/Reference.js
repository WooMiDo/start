const Type2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
    });
  };

  //컬럼 명
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

  const defaultdata = [];
  for (let i = 1; i <= 5; i++) {
    data.push({
      key: i,
      name: `John Brown ${i}`,
      age: Number(`${i}`),
      address: `New York No. ${i} Lake Park`,
      email: `abc123 ${i} @bizspring.com`,
    });
  }

  //add a row버튼 클릭했을 경우 샐행
  const handleAdd = () => {};

  // const tableColumns = columns.map((item) => ({
  //   ...item,
  // }));

  return (
    <div className="type2Div">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
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
        dataSource={defaultdata}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};
