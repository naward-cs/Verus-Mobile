import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Divider, List, Portal } from "react-native-paper";
import DatePickerModal from "../../../components/DatePickerModal/DatePickerModal";
import ListSelectionModal from "../../../components/ListSelectionModal/ListSelectionModal";
import PhoneNumberModal from "../../../components/PhoneNumberModal/PhoneNumberModal";
import TextInputModal from "../../../components/TextInputModal/TextInputModal";
import Styles from "../../../styles";
import { ISO_3166_COUNTRIES, ISO_3166_ALPHA_2_CODES } from "../../../utils/constants/iso3166";
import { CALLING_CODES_TO_ISO_3166 } from "../../../utils/constants/callingCodes";
import { PERSONAL_TAX_COUNTRIES } from "../../../utils/constants/personal";

export const PersonalLocationsRender = function () {
  return (
    <SafeAreaView style={Styles.defaultRoot}>
      <ScrollView style={Styles.fullWidth}>
        <Portal>
          {this.state.addPropertyModal.open &&
            this.state.addPropertyModal.property === PERSONAL_TAX_COUNTRIES && (
              <ListSelectionModal
                title={this.state.addPropertyModal.label}
                flexHeight={3}
                visible={
                  this.state.addPropertyModal.open &&
                  this.state.addPropertyModal.property ===
                    PERSONAL_TAX_COUNTRIES
                }
                onSelect={(item) =>
                  this.editTaxCountry(
                    item.key,
                    this.state.addPropertyModal.index
                  )
                }
                data={ISO_3166_ALPHA_2_CODES.map((code) => {
                  const item = ISO_3166_COUNTRIES[code];

                  return {
                    key: code,
                    title: `${item.emoji} ${item.name}`,
                  };
                })}
                cancel={() => this.clearAddPropertyModal()}
              />
            )}
          {this.state.editPropertyModal.open && (
            <ListSelectionModal
              title={this.state.editPropertyModal.label}
              flexHeight={0.5}
              visible={this.state.editPropertyModal.open}
              onSelect={(item) => this.selectEditPropertyButton(item.key)}
              data={this.EDIT_PROPERTY_BUTTONS}
              cancel={() => this.closeEditPropertyModal()}
            />
          )}
        </Portal>
        <List.Subheader>{"Tax countries"}</List.Subheader>
        <Divider />
        {this.state.locations.tax_countries == null
          ? null
          : this.state.locations.tax_countries.map((code, index) => {
              const nationality = ISO_3166_COUNTRIES[code];

              return (
                <React.Fragment key={index}>
                  <List.Item
                    key={index}
                    title={`${nationality.emoji} ${nationality.name}`}
                    description={`Tax country ${index + 1}`}
                    right={(props) => (
                      <List.Icon {...props} icon={"account-edit"} size={20} />
                    )}
                    onPress={() =>
                      this.openEditPropertyModal(
                        `Tax Country ${index + 1}`,
                        PERSONAL_TAX_COUNTRIES,
                        index
                      )
                    }
                  />
                  <Divider />
                </React.Fragment>
              );
            })}
        <List.Item
          title={"Add tax country"}
          right={(props) => <List.Icon {...props} icon={"plus"} size={20} />}
          onPress={() => this.openTaxCountryModal()}
        />
        <Divider />
        <List.Subheader>{"Addresses"}</List.Subheader>
        <Divider />
        {this.state.locations.physical_addresses == null
          ? null
          : this.state.locations.physical_addresses.map((address, index) => {
              return (
                <React.Fragment key={index}>
                  <List.Item
                    key={index}
                    title={
                      address.street1.length > 0
                        ? `${address.street1}${
                            address.street2.length > 0
                              ? `, ${address.street2}`
                              : ""
                          }`
                        : "Empty address"
                    }
                    description={`${
                      address.postal_code.length > 0
                        ? `${address.postal_code} `
                        : ""
                    }${
                      address.state_province_region.length > 0
                        ? `${address.state_province_region}, `
                        : ""
                    }${address.city.length > 0 ? `${address.city}, ` : "Unknown City, "}${
                      ISO_3166_COUNTRIES[address.country] != null
                        ? `${ISO_3166_COUNTRIES[address.country].emoji} ${
                            ISO_3166_COUNTRIES[address.country].name
                          }`
                        : "Unknown Country"
                    }`}
                    right={(props) => (
                      <List.Icon {...props} icon={"chevron-right"} size={20} />
                    )}
                    onPress={() => this.openEditAddress(index)}
                  />
                  <Divider />
                </React.Fragment>
              );
            })}
        <List.Item
          title={"Add physical address"}
          right={(props) => (
            <List.Icon {...props} icon={"chevron-right"} size={20} />
          )}
          onPress={() => this.openEditAddress()}
        />
        <Divider />
      </ScrollView>
    </SafeAreaView>
  );
};