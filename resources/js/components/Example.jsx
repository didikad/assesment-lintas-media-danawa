import React from 'react';
import ReactDOM from 'react-dom/client';

function Example() {
    const goToLogin = () => {
        window.location.href = '/login';
    };
    const goToRegister = () => {
        window.location.href = '/register';
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">I'm an example component!</div>
                        <div className='d-flex justify-content-center gap-3 mb-3'>
                            <button onClick={goToLogin} className='btn btn-primary'>Login</button>
                            <button onClick={goToRegister} className='btn btn-primary'>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example/>
        </React.StrictMode>
    )
}
