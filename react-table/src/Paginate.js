import React from 'react';
import './Paginate.css'
 
const Paginate = ({ postsPerPage, totalPosts, paginate, currentPage}) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }
 
   return (
      <div className="pagination-container">
         <ul className="pagination">
            {pageNumbers.map((number) => (
               <li
                  key={number}
                  onClick={() => paginate(number)}
                  className={`page-number ${number===currentPage?'active':''}`}
               >
                  {number}
               </li>
            ))}
         </ul>
      </div>
   );
};
 
export default Paginate;