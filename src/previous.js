import React from "react";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { utils as XLSXUtils, writeFile } from "xlsx";

/**
 ******************************* ScoreCard **********************************
 *
 * */

const ScoreCard = () => {
  const data = [
    { id: 1, name: "페이지뷰", value: 32 },
    { id: 2, name: "전체 방문수", value: 27 },
    { id: 3, name: "북마크/직접입력 방문수", value: 17 },
    { id: 4, name: "외부유입 방문 랜딩페이지 통과율", value: "44.44%" },
    { id: 5, name: "전체 반송수", value: 22 },
  ];

  return (
    <table className="scorecard">
      <tbody>
        <tr>
          {data.map((item) => (
            <td key={item.id} className="cardName">
              {item.name}
              <br /> <strong className="emphasis">{item.value}</strong>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

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
      render: (text) => <button className="btn basicBtn">{text}</button>,
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
  //컬럼 명
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "오디언스 유형",
      align: "center",
      dataIndex: "audienceType",
      sorter: true,
      //유형별 icon에 다른 클래스명 부여
      render: (text) => {
        let iconColor = "";
        switch (text) {
          case "Behavioral":
            iconColor = "icon-behavioral";
            break;
          case "Discovery":
            iconColor = "icon-discovery";
            break;
          case "Union":
            iconColor = "icon-union";
            break;
          default:
            break;
        }
        return (
          <button className="btn typeBtn">
            <FontAwesomeIcon icon={faCircle} className={`icon ${iconColor}`} />
            {"  "}
            {text}
          </button>
        );
      },
    },
    {
      title: "오디언스명",
      dataIndex: "audienceName",
      sorter: true,
      render: (text) => <a>{text}</a>,
      align: "center",
    },
    {
      title: "잠재고객 수 (마지막일자)",
      dataIndex: "potentialNum",
      sorter: true,
      align: "right",
    },
    {
      title: "생성방법",
      dataIndex: "method",
      sorter: true,
      align: "center",
    },

    //상태별 버튼에 다른 클래스명 부여
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      align: "center",
      render: (text) => {
        let statusColor = "";
        switch (text) {
          case "생성중":
            statusColor = "status-creating";
            break;
          case "오류":
            statusColor = "status-error";
            break;
          case "완료":
            statusColor = "status-complete";
            break;
          default:
            break;
        }
        return (
          <button className={`btn statusBtn ${statusColor}`}>{text}</button>
        );
      },
    },
    {
      title: "관리",
      dataIndex: "manage",
      render: (text) => <button className="btn deleteBtn">{text}</button>,
      align: "center",
    },
  ];

  const defaultdata = [
    {
      key: 1,
      id: "101",
      audienceType: "Discovery",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "61,000",
      method: "자동",
      status: "생성중",
      manage: "삭제",
    },
    {
      key: 2,
      id: "102",
      audienceType: "Behavioral",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "61,100",
      method: "수동",
      status: "오류",
      manage: "삭제",
    },
    {
      key: 3,
      id: "103",
      audienceType: "Union",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "60,000",
      method: "자동",
      status: "완료",
      manage: "삭제",
    },
    {
      key: 4,
      id: "104",
      audienceType: "Behavioral",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "62,000",
      method: "수동",
      status: "완료",
      manage: "삭제",
    },
    {
      key: 5,
      id: "105",
      audienceType: "Discovery",
      audienceName: "네이버로 인입하여 구매한 유저 그룹",
      potentialNum: "60,500",
      method: "자동",
      status: "생성중",
      manage: "삭제",
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); //로딩 상태 : false(초기값)
  //테이블 상태(현재 페이지:1, 페이지당 항목 수: 3)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 3,
    },
    //정렬
    sorter: {
      field: "", //필드 (정렬할 항목)
      order: "", //순서
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
      sort: sorter,
    });
  };

  useEffect(() => {
    setLoading(true); //로딩상태 : true

    const sortedData = [...defaultdata]; //초기값 복사
    const { field, order } = tableParams.sort;

    //정렬
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

  //홀수열과 짝수열에 클래스 이름 지정 (배경색 다르게 하기 위해서)
  const rowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  //Excel 파일로 다운로드
  const handleDownload = () => {
    //새로운 workbook 생성
    const workbook = XLSXUtils.book_new();
    //테이블가져와서 시트로 반환
    const worksheet = XLSXUtils.table_to_sheet(
      document.getElementById("table")
    );
    //시트를 워크북에 첨부
    XLSXUtils.book_append_sheet(workbook, worksheet, "Sheet1");
    //워크북을 파일로 저장하여 audience_table이름으로 다운로드
    writeFile(workbook, "audience_table.xlsx");
  };

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
          style={{ marginBottom: 16 }}
          className="newBtn"
        >
          New Union Audience
        </Button>
        <div>
          <span className="searchText">Search:</span>
          <input type="text" className="inputBox" />
          <Button className="btn excelBtn" onClick={handleDownload}>
            Excel
          </Button>
        </div>
      </div>
      <Table
        id="table"
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        rowClassName={rowClassName}
      />
    </div>
  );
};

/**
 ******************************* Type3 **********************************
 *
 * */

const Type3 = () => {
  const columns = [
    {
      title: "키워드",
      dataIndex: "keyword",
    },
    {
      title: "캠페인",
      dataIndex: "campaign",
    },
    {
      title: "노출수",
      dataIndex: "exposeNum",
    },
    {
      title: "전환수",
      dataIndex: "turnoverNum",
    },
    {
      title: "매출액",
      dataIndex: "sales",
    },
    {
      title: "ROAS",
      dataIndex: "roas",
    },
  ];
  //테이블 내 확장 테이블 데이터
  const data = [];
  for (let i = 1; i <= 5; i++) {
    data.push({
      key: i,
      keyword: "방수천",
      campaign: "+",
      exposeNum: Number(`${i}2`),
      turnoverNum: Number(`${i}1`),
      sales: Number(`${i}`),
      roas: Number(`${i}100000`),
      description: "초기값",
    });
  }

  //2depth(row 펼침)
  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };

  const [expandable] = useState(defaultExpandable);
  const [rowSelection] = useState({});
  const [selectedTab] = useState("1");
  const [hasData] = useState(true);

  const tableColumns = columns.map((item) => ({
    ...item,
  }));
  const tableProps = {
    expandable: {
      ...expandable,
      expandedRowRender: (record) =>
        selectedTab === "1" ? <SubTable /> : null,
    },
    rowSelection,
  };

  return (
    <div className="type3Div">
      <Table
        {...tableProps}
        pagination={true}
        columns={tableColumns}
        dataSource={hasData ? data : []}
      />
    </div>
  );
};

const SubTable = () => {
  const subTableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "하나",
      dataIndex: "one",
      align: "center",
    },
    {
      title: "둘",
      dataIndex: "two",
      align: "center",
    },
    {
      title: "셋",
      dataIndex: "three",
      align: "center",
    },
  ];
  const subTableData = [];
  for (let i = 1; i <= 2; i++) {
    subTableData.push({
      id: i,
      one: 1111111111,
      two: 2222222222,
      three: 333333333,
    });
  }

  return (
    <div>
      <Table
        columns={subTableColumns}
        dataSource={subTableData}
        pagination={false}
      />
    </div>
  );
};

//원하는 데이터그리드 컴포넌트 출력
const DataGridComponent = () => {
  return (
    <div>
      <Type3 />
      <ScoreCard />
      <Type2 />
      <Type1 />
    </div>
  );
};

export default DataGridComponent;
