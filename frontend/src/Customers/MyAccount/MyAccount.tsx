import React from "react";
import { PageContainer } from "../../Components/PageContainer/PageContainer";
import { StandardCard } from "../../Components/StandardCard/StandardCard";

export const MyAccount = () => {
  return (
    <PageContainer title="My Account" description="this is my account page">
      <StandardCard heading="My Account">
        <div>My Account</div>
      </StandardCard>
    </PageContainer>
  );
};

