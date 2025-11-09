import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="auth_container container-fluid vh-100 d-flex align-items-center justify-content-center bg-light p-0">
            <div className="row w-100 h-100 shadow-lg overflow-hidden p-0">
                <div className="col-md-6 d-none d-md-block p-0">
                    <img
                        src={"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"}
                        alt="Auth Visual"
                        className="img-fluid h-100 w-100"
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className="col-12 col-md-6 bg-white p-4 p-md-5 d-flex flex-column justify-content-center">
                    {<Outlet />}
                </div>
            </div>

            <style jsx="true">{`
                @media (max-width: 768px) {
                    .auth_container {
                        height: auto !important;
                        min-height: 100vh;
                        padding: 20px !important;
                    }
                    form {
                        max-width: 100% !important;
                    }
                    h3 {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default AuthLayout;
