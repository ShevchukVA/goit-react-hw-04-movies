import querySring from 'query-string';
import PropTypes from 'prop-types';

export default function getQueryParams(string) {
  return querySring.parse(string);
}

getQueryParams.propTypes = {
  string: PropTypes.string.isRequired,
};
