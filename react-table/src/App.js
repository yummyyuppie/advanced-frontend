import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Loading from './Loading'
import Paginate from './Paginate';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage] = useState(10);
  const [currentData, setCurrentData] = useState([]);


  let tempNames = [];

  function fetchNames() {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com/',
      params: {
        format: 'json',
        gender: 'b',
        cc: 'all',
        email: 'gmail.com,yahoo.com',
        pwlen: '12',
        ip: 'a',
        phone: 'l,t,o',
        seed: 'helloworld',
        count: '100',
        maxage: '40',
        minage: '30',
        uuid: '1',
        color: '1',
        lic: '1',
        images: '1'
      },
      headers: {
        'X-RapidAPI-Key': 'd9548774famsh5c35bd1da884ae5p1dfecajsn26f0fa470628',
        'X-RapidAPI-Host': 'dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      tempNames = response.data.map((e)=> `${e.firstname} ${e.lastname}`)
    }).catch(function (error) {
     }).finally(()=> generateData());
  }
  
  const generateData = () => {
    let tempData = [];
    tempNames.forEach(e => {
      const math = Math.round(Math.random()*100);
      const history = Math.round(Math.random()*100);
      const geo = Math.round(Math.random()*100);
      const bio = Math.round(Math.random()*100);
      const avg  = (math+geo+bio+history)/4;
      tempData.push({'name': e, 'math': math, 'history':history, 'geo':geo, 'bio':bio, avg: avg});
    });
    setData(tempData);
    paginate(1);
    setLoading(false);
  }
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
 };

  useEffect(()=>{
    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFirstPost = indexOfLastPost - dataPerPage;
    console.log(indexOfFirstPost, indexOfLastPost);
    setCurrentData([...data.slice(indexOfFirstPost, indexOfLastPost)]);
  }, [currentPage])
  
  useEffect(()=>{
    fetchNames();
  }, []);

  return (
    <div className="App">
      <h1>This is table, it will generate new marks everytime you reload the page!</h1>
      <div className='flex'>
      { !loading && data.length>0 &&
      <>
      <table border="1" style={{borderCollapse: "collapse"}}>
        <thead>
        <tr>
          <th>Name</th>
          <th>Math</th>
          <th>History</th>
          <th>Geographics</th>
          <th>Biology</th>
          <th>Avg:</th>
        </tr>
        </thead>
        <tbody>
        {
          currentData.map((e, idx)=> 
            {
              return(
              <tr key={idx}>
                <td>{e.name}</td>
                <td style={{'color': e.math>=40?'green':'red'}}>{e.math}</td>
                <td style={{'color': e.history>=40?'green':'red'}}>{e.history}</td>
                <td style={{'color': e.geo>=40?'green':'red'}}>{e.geo}</td>
                <td style={{'color': e.bio>=40?'green':'red'}}>{e.bio}</td>
                <td style={{'color': e.avg>=40?'green':'red'}}>{e.avg}</td>
                <td style={{'color': e.avg>=40?'green':'red'}}>{ e.avg>=40?'pass':'fail'}</td>
              </tr>)
            }
          )
        }
        </tbody>
      </table>
      <Paginate 
        postsPerPage={dataPerPage}
        totalPosts={data.length}
        paginate={paginate}
        currentPage={currentPage}
        />
      </>
      }
      {
        loading && <Loading />
      }
      </div>
    </div>
  );
}

export default App;
