import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Highlighter from "react-highlight-words";
import axios from "axios";
import Card from "../components/Card";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState("Paris");
  const [selected, setSelected] = useState("");

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 5;
  const [state, setState] = useState({
    searching: false,
    loading: true,
    datas: [],
  });

  console.log(state);
  const [maRecherche, setMaRecherche] = useState("Paris");
  let timerRef = useRef();
  useEffect(() => {
    getData(selected, maRecherche);
    getCategories();
    getLocation();
  }, [selected, itemOffset, itemsPerPage, location, maRecherche]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    console.log(newOffset);
  };
  const search = (e) => {
    // let value = e.target.value;
    setMaRecherche(e.target.value);
  };
  const getLocation = async () => {
    try {
      const res = await axios.get(
        `https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/facets?&facet=placename&facet=department&facet=region&facet=city&timezone=UTC`
      );
      console.log(res.data.facets, "facets");
      setState((state) => ({
        ...state,
        loading: false,
        datas: res.data.facets,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const getData = async (refine = "sport", where = "%22Paris%22") => {
    const res = await axios
      .get(
        `https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records?rows=30`,
        {
          params: {
            refine: "tags:" + refine,
            where: '"' + where + '"',
          },
        }
      )
      .then(function (response) {
        //   console.warn(response.data);
        console.warn(response.data.records);

        setData(response.data.records);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.warn(res.data.records);
    // setData(res.data.records);
    // (res.data)
  };
  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/facets"
      );
      console.log(res.data);
      setCategories(res.data.facets[0].facets);
      // (res.data)
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    // console.log(event.target.value);
    setSelected(event.target.value);
  };
  const handleClick = (search) => {
    setLocation(search);
  };
  return (
    <div className="container">
      <div className="menu">
        <div className="filters">
          <div className="container">
            <label htmlFor="cat">Categories:</label> <br />
            <select id="cat" value={selected} onChange={handleChange}>
              {categories.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              style={{ margin: "2em 0" }}
              className=""
              type="search"
              placeholder="Recherche"
              onChange={search}
            />
            {state.searching && (
              <ul>
                {!state.loading ? (
                  state.datas.length > 0 ? (
                    <>
                      {state.datas &&
                        state.datas.map((item, index) => {
                          const filteredLocations = item.facets.filter(
                            (location) => {
                              return location.name
                                .toLowerCase()
                                .includes(maRecherche.toLowerCase());
                            }
                          );
                          return (
                            <>
                              {filteredLocations.map((loc, index) => {
                                console.log(item, "loc");
                                return (
                                  <>
                                    <li
                                      key={index}
                                      value={item.name}
                                      onClick={handleClick}
                                    >
                                      <NavLink href="#">
                                        <Highlighter
                                          highlightClassName="highlistClass"
                                          searchWords={maRecherche.split(" ")}
                                          autoEscape={true}
                                          textToHighlight={loc.name}
                                        />
                                      </NavLink>
                                    </li>
                                  </>
                                );
                              })}
                            </>
                          );
                        })}
                    </>
                  ) : (
                    <li className="py-2 px-4 transition-colors bg-red-100">
                      Aucun résultats
                    </li>
                  )
                ) : (
                  <li className="py-2 px-4 transition-colors bg-green-100">
                    Chargement en cours
                  </li>
                )}
              </ul>
            )}
            <button className="btn " type="button">
              Filtrer
            </button>
          </div>
        </div>
        <div>
          <>
            {data &&
              data?.map((event, index) => <Card key={index} event={event} />)}
          </>

          <ReactPaginate
            breakLabel="..."
            nextLabel="»"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel="«"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            pageLinkClassName={"link"}
            previousLinkClassName={"link"}
            nextLinkClassName={"link"}
            breakClassName={"link"}
            breakLinkClassName={"page-link"}
            activeLinkClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
