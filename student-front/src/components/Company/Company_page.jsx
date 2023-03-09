import { Navbar } from '../Navbar/Navbar'
// import data from'./Input.json'
import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { json, useParams} from 'react-router-dom'
import crypto from 'crypto-js'
import { Pre_loading_page } from '../Pre-Loading/Pre_loading_page' 

export const Company_page = ({fetched_url}) => {
  let url = "http://127.0.0.1:5000/api"
  const [_data, set_data] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [isElligible, setisElligible] = useState([
    {
      _value : true,
    }
  ]);

  const handleApply = (e,index) =>{
    
  }
  useEffect(() => {
    
    console.log("hello from company page")
    const id1 = '63fda9a0dc1e2307a2ec7b84';
    const id = fetched_url.id1;
    console.log("id from props : ", id)
    const getValues = async () => {
      try {
        // getId()
        // const data = await axios.get(`${url}/Company/${id}`)
        const data = await fetch(`${url}/company/?id=${id}`).then(response => response.json()).then(console.log(json))
        console.log("Data from company page: ", data)
        set_data(data.data)
        setIsLoading(false)
        data.data.roles.forEach((item) =>{
          const newObj = {
            _value : true,
          }
          setisElligible(prevState => ([...prevState,newObj]))
        })
        console.log("Data stored in useState: ", _data)
      } catch (err) {
        console.log("error1111: ", err)
      }
    }

    getValues()

    return () => {

    }
  }, [])

  return (

    <div>
      {isLoading ? <Pre_loading_page/> : 
    <div style={{ backgroundColor: '#0B0E2A' }}>
      <Navbar />

      <div style={{ backgroundColor: '#0B0E2A' }} className="text-white pt-28 ">
        <div style={{ backgroundColor: "#1A1C33" }} className="mx-72 grid ">

          <br />
          <div className='flex flex-row align-middle justify-center'>
            <div className='basis-1/3 mx-2'>
              <label htmlFor="">Name</label>
            </div>
            <div className='mx-2 w-full'>
              <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data.name} autoComplete='false' readOnly={true}></input>
            </div>
          </div>
          <br />
          {/* ********************************* */}

          <div className='flex flex-row align-middle justify-center'>
            <div className='basis-1/3 mx-2'>
              <label htmlFor="">Website</label>
            </div>
            <div className='mx-2 w-full'>
              <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data.website} autoComplete='false' readOnly={true}></input>
            </div>
          </div>
          <br />
          {/* ********************************* */}

          <div className='flex flex-row align-middle justify-center'>
            <div className='basis-1/3 mx-2'>
              <label htmlFor="">Mail id</label>
            </div>
            <div className='mx-2 w-full'>
              <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data.email} autoComplete='false' readOnly={true}></input>
            </div>
          </div>
          <br />
          {/* ********************************* */}

          <div className='flex flex-row align-middle justify-center'>
            <div className='basis-1/3 mx-2'>
              <label htmlFor="">For Batch</label>
            </div>
            <div className='mx-2 w-full'>
              <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data && _data.forBatch} autoComplete='false' readOnly={true}></input>
            </div>
          </div>
          <br />
          {/* ********************************* */}

          <div className='flex flex-row align-middle justify-center'>
            <div className='basis-1/3 mx-2'>
              <label htmlFor="">Description</label>
            </div>
            <div className='mx-2 w-full'>
              <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data && _data.description} autoComplete='false' readOnly={true}></input>
            </div>
          </div>
          <br />
          {/* ********************************* */}


          <br />
          <div className='mx-2'>
            <h2>Roles</h2>
          </div>
          <br />
          {console.log(_data.roles)}
          {
            _data.roles.map((item,index) => {
              return (
                <div>
                  {item.name ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Name</label>
                      </div>
            
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.name} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}
            
                  {item.avgPackage ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Average Package</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.avgPackage} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}
            
            
                  {item.type ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Type</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.type} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}
            
            
                  {item.mode ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Mode</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.mode} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}
            
                  {item.bonds ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Bond (in Months)</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.bonds} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}
            
            
                  {item.deadline ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Deadline to apply</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.deadline} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}
            
            
                  {item.interviewMode ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Interview Mode</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.interviewMode} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}
            
                  {item.requirements ? <div>
                    <div className='mx-2'>
                      <h2>Requirements for this role</h2>
                    </div>
                    <br />
                    {item.requirements.cpi ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">CPI</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.requirements.cpi} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}


                    {item.requirements.twelfthPerc ? <div>
                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Twelth Percentage</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item.requirements.twelfthPerc} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    {/* ********************************* */}
                  </div> : null}

                    {item.requirements.competitiveCoding ? <div>
                      {/* {console.log(item.requirements.competitiveCoding)} */}
                        {item.requirements.competitiveCoding.map((item1) =>
                        {
                          return (<div className='mx-30'>
                            {console.log(item, ": ", item1.platform)}
                            {/* <div className='flex flex-row align-middle justify-center'>
                              <div className='basis-1/3 mx-2'>
                                <label htmlFor="">Platform</label>
                              </div>
                              
                              <div className='mx-2 w-full'>
                                <input type="text" className='px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item1.platform} autoComplete='false' readOnly={true}></input>
                              </div>
                            </div>
                            <br /> */}

                    <div className='flex flex-row align-middle justify-center'>
                        <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Platform</label>
                    </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item1.platform} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />

                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Starts</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item1.stars} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />

                    <div className='flex flex-row align-middle justify-center'>
                      <div className='basis-1/3 mx-2'>
                        <label htmlFor="">Rating</label>
                      </div>
                      
                      <div className='mx-2 w-full'>
                        <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={item1.ratings} autoComplete='false' readOnly={true}></input>
                      </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                            {/* ********************************* */}
                          </div>)
                          }
                        )}
                  </div> : null}
                    {/* ********************************* */}


                    {item.requirements.expectedSkills ? <div>

                    </div> : null}

                  </div> : null}

                  <br />

                  <div className='flex justify-center'>
                    <div  className='w-2/12 grid justify-items-center m-2 p-2 hover:bg-blue-700 bg-indigo-900'>
                      <a href="www.google.com"><button className='text-white' key={index} onClick = {handleApply} disabled = {isElligible[index]._value} 
                       >Apply</button></a>
                    </div>
                  </div>
                  {console.log(index, " <---> ",isElligible[index]._value)}
                  <br />
                  {/* ************************************* */}
                  <hr />
                  <br />
                </div>)
            })
          }
          {
                    _data.address ? <div>
                      <br />
                    <div className='mx-2'>
                    <h2>Address</h2>
                    </div>
                    <br />

                    {_data.address.city ? <div>
                      <div className='flex flex-row align-middle justify-center'>
                              <div className='basis-1/3 mx-2'>
                                <label htmlFor="">City</label>
                              </div>
                              
                              <div className='mx-2 w-full'>
                                <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data.address.city} autoComplete='false' readOnly={true}></input>
                              </div>  
                            </div>
                            <br />
                            {/* ********************************* */}
                    </div> : null}

                    {_data.address.district ? <div>
                      <div className='flex flex-row align-middle justify-center'>
                              <div className='basis-1/3 mx-2'>
                                <label htmlFor="">District</label>
                              </div>
                              
                              <div className='mx-2 w-full'>
                                <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data.address.district} autoComplete='false' readOnly={true}></input>
                              </div>  
                            </div>
                            <br />
                            {/* ********************************* */}
                    </div> : null}

                    {_data.address.state ? <div>
                      <div className='flex flex-row align-middle justify-center'>
                              <div className='basis-1/3 mx-2'>
                                <label htmlFor="">State</label>
                              </div>
                              
                              <div className='mx-2 w-full'>
                                <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data.address.state} autoComplete='false' readOnly={true}></input>
                              </div>  
                            </div>
                            <br />
                            {/* ********************************* */}
                    </div> : null}


                    {_data.address.postalCode ? <div>
                      <div className='flex flex-row align-middle justify-center'>
                              <div className='basis-1/3 mx-2'>
                                <label htmlFor="">Postal Code</label>
                              </div>
                              
                              <div className='mx-2 w-full'>
                                <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data.address.postalCode} autoComplete='false' readOnly={true}></input>
                              </div>  
                            </div>
                            <br />
                            {/* ********************************* */}
                    </div> : null}

                    {_data.address.completeAddress ? <div>
                      <div className='flex flex-row align-middle justify-center'>
                              <div className='basis-1/3 mx-2'>
                                <label htmlFor="">Complete Address</label>
                              </div>
                              
                              <div className='mx-2 w-full'>
                                <input type="text" className=' px-3 py-2 flex rounded-lg pt-2 bg-gray-700 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full' value={_data.address.completeAddress} autoComplete='false' readOnly={true}></input>
                              </div>  
                            </div>
                            <br />
                            {/* ********************************* */}
                    </div> : null}

                    </div> : null
                  }
          <br /><br />
          <div className='flex justify-around mx-8'>
            <div>
              <button style={{ backgroundColor: '#3040D6' }} className='p-3 rounded-full w-40'>Save Changes</button>
            </div>

            <div>
              <button style={{ backgroundColor: '#3040D6' }} className='p-3 rounded-full w-40'>Cancel</button>
            </div>
          </div>

          <br /><br />
        </div>

        <br /><br /><br />
      </div>
    </div>
}
    </div>
  )
}