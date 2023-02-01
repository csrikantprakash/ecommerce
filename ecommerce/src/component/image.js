import { Modal , Box} from "@mui/material";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { LoadProducts } from "./api"

import "./image.css";

const Image = () => {
    const data = LoadProducts();
    const [pageNumber, setPageNumber] = useState(0);
    const [category, setCategory] = useState();
    const [categorySorted, setCategorySorted] = useState(null);
    const [open, setOpen] = useState("");
    const [imgData, setImgData] = useState("");

    const usersPerPage = 10;
    const pageVisited = usersPerPage * pageNumber;

    let pageCount = Math.ceil(data.length / usersPerPage);

    const handleCategory = (e) => {
        let cSorted = null;
        setCategory(e.target.value);
        console.log(category);
        if (category) {
            if (category == "default") {
                console.log("test");
                cSorted = data;
            } else {
                cSorted = data.filter((item) => {
                    if (item.category == category) return item;
                })
            }
            setCategorySorted(cSorted);
        }
        console.log(categorySorted);
    }
    useEffect(() => {
        let cSorted = null;
        if (category) {
            if (category == "default") {
                console.log("test");
                cSorted = data;
            } else {
                cSorted = data.filter((item) => {
                    if (item.category == category) return item;
                })
            }
            pageCount = Math.ceil(cSorted.length / usersPerPage);
            setCategorySorted(cSorted);
        }
        console.log(categorySorted);
    }, [category]);



    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    const handleImageClick = (i) =>{
        setOpen("open");
        setImgData(data[i]);
    }

    return (
        <div className="container">
             <Modal open={open}>
                    <Box sx={{backgroundColor:"white", width:  200, margin: "200px auto", padding: "20px"  }}>
                        <img src={imgData.thumbnail}></img>
                        <div> Decription : {imgData.description}</div>
                        <button onClick={()=>{setOpen("")}}>Close</button>
                    </Box>
            </Modal>
            <div className="category">
                <select id="category" onChange={handleCategory}>
                    <option value="default"></option>
                    <option value="groceries">Groceries</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="skincare">Skin Care</option>
                </select>
            </div>
            {!categorySorted ? <h2>Top 30 rated products - api only has 30</h2> : null}
            <div>
                {!categorySorted ? <> {data.slice(pageVisited, usersPerPage + pageVisited).map((item, i) => {
                    return (
                        <div className="item" key={i}>
                            <div className="rating">
                                Rating: {item.rating}
                            </div>
                            <div>
                                <img src={item.thumbnail} onClick={()=>handleImageClick(i)}/>
                            </div>
                        </div>
                    )
                })}
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationButtons"}
                        previousClassName={"previousButton"}
                        nextClassName={"nextButton"}
                        activeClassName={"activeButton"}
                        disabledClassName={"disabledButton"}

                    />

                </> : <>{categorySorted.map((item, i) => {
                    return (
                        <div className="item" key={i}>
                            <div className="rating">
                                Rating : {item.rating}
                            </div>
                            <div>
                                <img src={item.thumbnail}  onClick={()=>handleImageClick(i)}/>
                            </div>

                        </div>
                    )})}
                        <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={1}
                        onPageChange={changePage}
                        containerClassName={"paginationButtons"}
                        previousClassName={"previousButton"}
                        nextClassName={"nextButton"}
                        activeClassName={"activeButton"}
                        disabledClassName={"disabledButton"}
                        />
                    </>
                    }

            </div>
        </div>
    )
}
export default Image;