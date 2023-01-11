import React from "react";


const IGPrimaryImmuneDeficiency = () => {
    return (
        <>
            <div href="" className="container container_hemat">
                <form>
                    {/* 3) Clinical Information */}
                    <h3 className="hemo_h3">IG Primary Immune / Clinical Information </h3>
                    <label className="form-label form-control" htmlFor="IGPrimaryImmuneDeficiency"> {"Other drugs used to treat patient’s condition:"}
                        <input type="text" name="Drugs used fot the condition"  className="form-control" size="60"></input>
                    </label>
                    <label className="form-label form-control"> First dose of IGIV:
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" name="First dose of IGIV" defaultValue="Yes"/>
                            <label htmlFor="html" className="form-check-label"> Yes </label>
                        </div>
                         <div className="form-check form-check-inline">
                             <input type="radio" className="form-check-input" name="First dose of IGIV" defaultValue="No"/>
                             <label className="form-check-label" htmlFor="css"> No </label>
                         </div>
                    </label>
                    <label className="form-label form-control" htmlFor="Prior IGIV products"> Prior IGIV products tried:
                        <input type="text" name="Prior IGIV products" className="form-control" size="60"></input>
                        <label className="form-label" htmlFor="Adverse reactions"> Adverse reactions with previous IGIV treatments: </label>
                        <input type="text" name="Adverse reactions" className="form-control" size="60"></input>
                    </label>
                    <label className="form-label form-control" htmlFor="ICD-10"> ICD-10: &nbsp;
                        <input type="text" name="ICD-10" size="10"></input>
                    </label>
                    <label htmlFor="" className="form-label form-control">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-1" defaultValue="Acute Infective Polyneuritis"/>
                            <label htmlFor="html"className="form-check-label"> {"Acute Infective Polyneuritis (Guillain-Barre Syndrome)"} </label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-2" defaultValue="Inflammatory Polyneuropathy"/>
                            <label htmlFor="html" className="form-check-label"> Inflammatory Polyneuropathy, Unspecified </label>
                         </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-3" defaultValue="Pemphigus"/>
                            <label htmlFor="html" className="form-check-label"> Pemphigus (Foliaceus / Vulgaris) </label>
                         </div>
                       <div className="form-check">
                           <input type="checkbox" className="form-check-input" name="ICD-10-4" defaultValue="Dermatomyositis"/>
                           <label htmlFor="html" className="form-check-label"> Dermatomyositis </label>
                         </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-5" defaultValue="Stiff-Person Syndrome"/>
                            <label htmlFor="html"className="form-check-label"> Stiff-Person Syndrome </label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-6" defaultValue="Myasthenia Gravis with Exacerbation"/>
                            <label htmlFor="html" className="form-check-label"> Myasthenia Gravis with (Acute) Exacerbation </label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-7" defaultValue="Multiple Sclerosis"/>
                            <label htmlFor="html" className="form-check-label"> Multiple Sclerosis (MS) </label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-8" defaultValue="Pemphigoid"/>
                            <label htmlFor="html" className="form-check-label"> Pemphigoid </label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-6" defaultValue="Myasthenia Gravis without Exacerbation"/>
                            <label htmlFor="html" className="form-check-label"> Myasthenia Gravis without (Acute) Exacerbation </label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-7" defaultValue="Multifocal Neuropathy"/>
                            <label htmlFor="html" className="form-check-label"> Multifocal Neuropathy (MMN) </label> <br/>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-8" defaultValue="Chronic Inflammatory Demyelinating Polyneuropathy"/>
                            <label htmlFor="html" className="form-check-label"> {"Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)"} </label>

                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="ICD-10-9" defaultValue="Other"/>
                            <label htmlFor="html" className="form-check-label"> Other:
                                <input type="text" name="Other" className="form-control" size="60"></input>
                            </label>
                        </div>
                    </label>
                    <div className="d-grid gap-2 col-md-12 mx-auto">
                        <button className="btn btn-outline-primary btn_ast" type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </>
    )
}
export default IGPrimaryImmuneDeficiency