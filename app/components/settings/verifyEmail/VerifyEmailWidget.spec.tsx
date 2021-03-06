import { expect } from "chai";
import { render, shallow } from "enzyme";
import * as React from "react";
import { spy } from "sinon";
import { createMount } from "../../../../test/createMount";
import { waitUntilDoesntThrow, wrapWithIntl } from "../../../../test/integrationTestUtils";
import { tid } from "../../../../test/testUtils";
import { dummyIntl } from "../../../utils/injectIntlHelpers.fixtures";
import { VerifyEmailWidgetComponent } from "./VerifyEmailWidget";

describe("<VerifyEmailWidgetComponent />", () => {
  it("should render verified section", () => {
    const verifyEmailWidget = shallow(
      <VerifyEmailWidgetComponent
        step={1}
        isThereUnverifiedEmail={false}
        isUserEmailVerified={true}
        resendEmail={() => {}}
        addNewEmail={() => {}}
        intl={dummyIntl}
      />,
    );
    expect(verifyEmailWidget.find(tid("unverified-section"))).to.have.length(0);
    expect(verifyEmailWidget.find(tid("verified-section"))).to.have.length(1);
  });

  it("should render unverified section", () => {
    const verifyEmailWidget = shallow(
      <VerifyEmailWidgetComponent
        step={1}
        isThereUnverifiedEmail={true}
        isUserEmailVerified={false}
        resendEmail={() => {}}
        addNewEmail={() => {}}
        intl={dummyIntl}
      />,
    );
    expect(verifyEmailWidget.find(tid("unverified-section"))).to.have.length(1);
    expect(verifyEmailWidget.find(tid("verified-section"))).to.have.length(0);
  });

  it("should not render resend link button", () => {
    const verifyEmailWidget = shallow(
      <VerifyEmailWidgetComponent
        step={1}
        isThereUnverifiedEmail={false}
        isUserEmailVerified={false}
        resendEmail={() => {}}
        addNewEmail={() => {}}
        intl={dummyIntl}
      />,
    );
    expect(verifyEmailWidget.find(tid("resend-link"))).to.have.length(0);
  });

  it("should render resend link button", () => {
    const verifyEmailWidget = render(
      wrapWithIntl(
        <VerifyEmailWidgetComponent
          step={1}
          isThereUnverifiedEmail={true}
          isUserEmailVerified={false}
          unverifiedEmail="test@test.com"
          resendEmail={() => {}}
          addNewEmail={() => {}}
          intl={dummyIntl}
        />,
      ),
    );
    expect(verifyEmailWidget.find(tid("resend-link"))).to.have.length(1);
  });

  describe("email form", () => {
    it("initially submit button should be disabled", () => {
      const verifyEmailWidget = createMount(
        wrapWithIntl(
          <VerifyEmailWidgetComponent
            step={1}
            isThereUnverifiedEmail={false}
            isUserEmailVerified={false}
            resendEmail={() => {}}
            addNewEmail={() => {}}
            intl={dummyIntl}
          />,
        ),
      );

      expect(
        verifyEmailWidget
          .find(tid("verify-email-widget-form-submit"))
          .first()
          .prop("disabled"),
      ).to.be.true;
    });

    it("should be possible to submit with valid email", async () => {
      const addNewEmailSpy = spy();
      const verifyEmailWidget = createMount(
        wrapWithIntl(
          <VerifyEmailWidgetComponent
            step={1}
            isThereUnverifiedEmail={false}
            isUserEmailVerified={false}
            resendEmail={() => {}}
            addNewEmail={addNewEmailSpy}
            intl={dummyIntl}
          />,
        ),
      );

      verifyEmailWidget
        .find(tid("verify-email-widget-form-email-input"))
        .last()
        .simulate("change", {
          target: {
            name: "email",
            value: "valid@email.com",
          },
        });

      expect(
        verifyEmailWidget
          .find(tid("verify-email-widget-form-submit"))
          .first()
          .prop("disabled"),
      ).to.be.false;

      verifyEmailWidget.find("form").simulate("submit");

      await waitUntilDoesntThrow(() => {
        expect(addNewEmailSpy).to.be.calledOnce;
      }, "Form callback should be called");
    });

    it("should not be possible to submit with invalid email", async () => {
      const verifyEmailWidget = createMount(
        wrapWithIntl(
          <VerifyEmailWidgetComponent
            step={1}
            isThereUnverifiedEmail={false}
            isUserEmailVerified={false}
            resendEmail={() => {}}
            addNewEmail={() => {}}
            intl={dummyIntl}
          />,
        ),
      );

      verifyEmailWidget
        .find(tid("verify-email-widget-form-email-input"))
        .last()
        .simulate("change", {
          target: {
            name: "email",
            value: "not-valid",
          },
        });

      await waitUntilDoesntThrow(() => {
        verifyEmailWidget.update();
        expect(
          verifyEmailWidget
            .find(tid("verify-email-widget-form-submit"))
            .first()
            .prop("disabled"),
        ).to.be.true;
      }, "Form submit should be disabled!");
    });
  });
});
