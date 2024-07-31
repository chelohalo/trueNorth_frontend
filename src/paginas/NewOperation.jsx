import FormOperation from "../components/FormOperation"

const NewOperation = () => {
    return (
      <>
        <h1 className="font-bold text-4xl">New operation</h1>
        
        <div className="mt-10 flex justify-center">
            <FormOperation />
        </div>
      </>
  
    )
  }
  
  export default NewOperation