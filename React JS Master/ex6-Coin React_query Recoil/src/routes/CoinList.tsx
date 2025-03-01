import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useThemeMode,isDarkAtom } from "../atoms";
import { Container, Header, Img, Title, Coin, CoinsList } from "./styledComp";
import { useSetRecoilState } from "recoil";
interface ICoin {
  id: string;
  name: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  symbol: string;
}

export default function Coins() {
  // const setDarkAtom = useSetRecoilState(isDarkAtom);
  const { toggleMode } = useThemeMode();

  // 1. state 저장, 2. 로딩 여부 3. 캐싱 4. useEffect의 한번 실행 효과
  // 함수를 넘기는 것으로 반환값을 넘기는것이 아님 따라서 동일한 형태는 ()=>{}이 됨
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header></Header>
      <Title style={{ display: "flex" }}>
        코인{" "}
        <button className="simplebutton-reversed" onClick={toggleMode}>
        {/* <button className="simplebutton-reversed" onClick={()=> setDarkAtom((prev)=>(!prev))}> */}
          ToggleMode
        </button>
      </Title>
      {isLoading ? (
        "loading..."
      ) : (
        // 하나의 엘리먼트만 들어가야 한다.
        <CoinsList>
          {data?.map((coin: ICoin) => (
            <Coin key={coin.id}>
              {/* state에 cool 항목 추가 {}를 한번 더쳐서 보내야함 */}
              {/* 아래 /의 의미는 도메인 바로 다음을 뜻함 */}
              <Link to={`/${coin.id}`} state={{ cool: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
